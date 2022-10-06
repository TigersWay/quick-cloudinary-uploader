#!/usr/bin/env node

require('dotenv').config();

const
  cloudinary = require('cloudinary').v2,
  fg = require('fast-glob'),
  { red, green, yellow, gray } = require('picocolors'),
  { program } = require('commander');


const upload = async (paths, project, force) => {

  // console.log(paths, project, force);

  // Can we access Cloudinary?
  try {
    await cloudinary.api.usage()
      .then(result => {
        // console.log(result);
        console.log(yellow('You are on a \'%s\' plan, with a credit usage of %f (%f%)'), result.plan, result.credits.usage, result.credits.used_percent);
      })
      .catch(result => {
        console.error(red('Error: %s'), result.error.message);
        process.exit(1);
      });
  } catch (e) {
    console.error(red('Error: %s'), e);
    process.exit(1);
  }

  // Let's list all resources/images in the project folder
  let images = [];
  if (!force) {
    await cloudinary.api.resources({ prefix: project, type: 'upload', max_results: 500 })
      .then(result => {
        // console.log(result);
        images = result.resources.map(res => res.public_id);
      })
      .catch(result => {
        console.error(red('Error: %s'), result.error.message);
        process.exit(1);
      });
  }
  // console.log(images);

  // And now upload all - if forced - or only new resources
  let count = 0;
  for (const path of paths) {
    const [root, glob] = `.:${path}`.split(':').slice(-2);
    const files = await fg(glob, { cwd: root });

    if (files.length) console.log(gray('Found %i resource(s)'), files.length);
    else console.log(gray('Found %i resource(s). Are you sure of your \'path(s)\'?'), files.length);

    for (const file of files) {
      const filename = file.split('.').slice(0, -1).join('.');
      if (images.includes(`${project ? project + '/' : ''}${filename}`)) {
        console.log(gray(filename));
      } else {
        await cloudinary.uploader.upload(`${root}/${file}`, { folder: project, public_id: filename })
          .then(result => { // eslint-disable-line no-unused-vars
            // console.log(result);
            console.log(green(filename));
            count++;
          })
          .catch(error => console.log(error));
      }
    }
  }

  console.log(yellow('%d resource(s) uploaded!'), count);
};


program
  .name('qcu')
  .description('Quick Cloudinary Uploader (CLI)')
  .option('-p, --project <folder>', 'Cloudinary main folder or project')
  .option('-f, --force', 'force upload all/even existing files')
  .version(require('./package.json').version, '-v, --version', 'output the version number')
  .argument('<paths...>', 'paths of files to upload')
  .action(paths => upload(paths, program.opts().project, program.opts().force || false))
  .parse();

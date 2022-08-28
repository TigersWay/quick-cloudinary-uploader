# quick-cloudinary-uploader  ![GitHub tag (latest by date)](https://img.shields.io/github/v/tag/tigersway/quick-cloudinary-uploader?style=flat-square) ![GitHub last commit](https://img.shields.io/github/last-commit/tigersway/quick-cloudinary-uploader?style=flat-square) ![GitHub issues](https://img.shields.io/github/issues/tigersway/quick-cloudinary-uploader?style=flat-square)

Mostly Windows user, I didn't want to deal with Python if I didn't need to, but still needed a simple Cloudinary uploader.
Here is an "quick" way.

### Usage  [![npm](https://img.shields.io/npm/dm/quick-cloudinary-uploader?label=npmjs&logo=npm&style=flat-square) ![npm](https://img.shields.io/npm/dt/quick-cloudinary-uploader?label=npmjs&logo=npm&style=flat-square)](https://www.npmjs.com/package/quick-cloudinary-uploader)

You first have to configure the required `cloud_name`, `api_key`, and `api_secret` by defining the `CLOUDINARY_URL` environment variable.\
Your `CLOUDINARY_URL` value is available in the dashboard page of your account console and should look like this: `CLOUDINARY_URL=cloudinary://my_key:my_secret@my_cloud_name`.

#### Install

`pnpm install quick-cloudinary-uploader`

or

`npm install quick-cloudinary-uploader`

#### Command line

`qcu [options] <paths...>`

```shell
Quick Cloudinary Uploader (CLI)

Arguments:
  paths                   paths of files to upload

Options:
  -p, --project <folder>  Cloudinary main folder or project
  -f, --force             force upload all/even existing files
  -v, --version           output the version number
  -h, --help              display help for command
```

- `qcu 'images/**.*'`\
  will upload new images only - from your `images` folder - to your Cloudinary root media folder.

- `qcu -fp my-project 'images/**/*' 'assets:**/*.{jpg,png,svg}'`\
  ALL images from your local `images` folder, and ALL jpg, png and svg from your `assets` folder - but without the "assets" part - will be uploaded to your Cloudinary folder `my-project`.

### CHANGELOG

- **v1.0.2**
  - README refresh
  - Update dependencies

- **v1.0.1**
  - Update dependencies

- **v1.0.0**
  - Initial upload

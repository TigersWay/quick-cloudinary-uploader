# quick-cloudinary-uploader

Mostly Windows user, I didn't want to deal with Python if I didn't need to, but still needed a simple Cloudinary uploader.
Here is an "quick" way.


## usage

You first have to configure the required `cloud_name`, `api_key`, and `api_secret` by defining the `CLOUDINARY_URL` environment variable.\
Your `CLOUDINARY_URL` value is available in the dashboard page of your account console and should look like this: `CLOUDINARY_URL=cloudinary://my_key:my_secret@my_cloud_name`.


    Usage: qcu [options] <paths...>

    Quick Cloudinary Uploader (CLI)

    Arguments:
      paths                   paths of files to upload

    Options:
      -p, --project <folder>  Cloudinary main folder or project
      -f, --force             force upload all/even existing files
      -v, --version           output the version number
      -h, --help              display help for command

## examples

- `qcu 'images/**.*'`\
should upload new images only to the root of your Cloudinary folder.

- `qcu -fp my-project 'images/**/*' 'assets:**/*.{jpg,png,svg}'`\
ALL images from the local `images` folder, and ALL jpg, png and svg from your `assets` folder - but without the "assets" part - will be uploaded to the `my-project` Cloudinary folder.

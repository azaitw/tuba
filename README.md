Tuba Project
=================
This is Tuba project's web frontend builder. The purpose is to automate repetitive tasks.


Installation
=================
Before you start, you need to install Node.js on your computer. Refer to the website for instructions:

    'https://nodejs.org/'

When installed, clone this repository to you computer, navigate into its directory, and execute this command to install packages, and you are ready to start!

    'npm i'


Development
=================
To develop using this builder, you need to do five things:

1. Write html markup in handlebars syntax, and place the source file in /source/templates
2. Write data for building HTML using Handlebars. This file is /source/data/data.json and /source/data/zh/data.json
3. Write Javascript and place files in /source/js, update gulpfile.js to include these JS files in specific loading order
4. Write CSS with LESS syntax and place files in /source/less, update gulpfile to include these CSS files in specific loading order
5. Regarding images, copy those that you will be using in CSS file into /source/images

Build
=================
In Terminal, navigate to this project folder, and execute this command to build files: 

    'npm run build'

If you wish to build non-compressed version and run server for development, use this command:

    'npm run dev'

Once it's done, you should see the generated HTML in /output/index.html. Use the following command to start a simple Node.js server and verify this page:

    'npm run start'

Use your browser to open this page:

    'http://localhost:3000'

Reference
=================
• Npm
  'https://docs.npmjs.com/'

• Handlebars
  'http://handlebarsjs.com/'

• Gulp
  'http://gulpjs.com/'

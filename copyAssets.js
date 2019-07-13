var shell = require('shelljs');


shell.cp('-R', 'dist/*', '../chekku-api/src/public/app/scripts/directives/form-builder-directive/');
shell.cp('-R', 'dist/*', '../chekku-cenosa-api/src/public/app/scripts/directives/form-builder-directive/');


console.log("Dist Folder Copied!");

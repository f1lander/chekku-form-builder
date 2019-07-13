var shell = require('shelljs');

shell.cp('-R', 'dist/*', '/Users/pichete/CodeRoasters/chekku-api/src/public/app/scripts/directives/form-builder-directive/');
shell.cp('-R', 'dist/*', '/Users/pichete/CodeRoasters/chekku-cenosa-api/src/public/app/scripts/directives/form-builder-directive/');

console.log("Dist Folder Copied!");
var shell = require('shelljs');

shell.cp('-R', 'dist/*', '/home/pichete/CodeRoasters/chekku-api/src/public/app/scripts/directives/form-builder-directive/');

console.log("Copy dist folder");
'use strict';

const fs          = require('fs');
const _           = require('lodash');
const camelize    = require('camelize');
const es6Template = fs.readFileSync([__dirname, 'templates/es6'].join('/'), 'utf8');
const es5Template = fs.readFileSync([__dirname, 'templates/es5'].join('/'), 'utf8');


function generate(className, config) {
  const fileName  = [process.cwd(), `${className}.jsx`].join('/');
  let fileContent = config.es6 ? es6Template : es5Template;
  fileContent     = fileContent.replace('<% className %>', className);
  let imports     = '';
  _.forEach(config.import, (include) => {
    imports += config.es6 ? 'const ' : 'var ';
    imports += `${camelize(include)} = require('${include}');`;
    imports += '\n';
  });
  fileContent = fileContent.replace('<% imports %>', imports);
  fs.writeFileSync(fileName, fileContent, {force: true});
}

module.exports = {
  generate
};
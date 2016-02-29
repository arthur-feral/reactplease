'use strict';

const fs          = require('fs');
const _           = require('lodash');
const camelize    = require('camelize');
const es6Template = fs.readFileSync([__dirname, 'templates/es6'].join('/'), 'utf8');
const es5Template = fs.readFileSync([__dirname, 'templates/es5'].join('/'), 'utf8');


function generate(className, config) {
  const fileName  = [process.cwd(), `${className}.jsx`].join('/');
  let fileContent = '';
  if (config.es6) {
    fileContent += es6Template;
  } else {
    fileContent += es5Template;
  }
  fileContent = fileContent.replace('<% className %>', className);
  let imports = '';
  _.forEach(config.import, (include) => {
    if (config.es6) {
      imports += `const ${camelize(include)} = require('${include}');`;
    } else {
      imports += `var ${camelize(include)} = require('${include}');`;
    }
    imports += '\n';
  });
  fileContent = fileContent.replace('<% imports %>', imports);
  fs.writeFileSync(fileName, fileContent, {force: true})
}

module.exports = {
  generate
};
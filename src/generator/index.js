'use strict';

const fs          = require('fs');
const _           = require('lodash');
const camelize    = require('camelize');
const es6Template = fs.readFileSync([__dirname, 'templates/es6'].join('/'), 'utf8');
const es5Template = fs.readFileSync([__dirname, 'templates/es5'].join('/'), 'utf8');


function generate(className, config) {
  let rawPath     = className.split('/');
  let path        = _.dropRight(rawPath).join('/');
  let name        = _.last(rawPath).replace('.jsx', '');
  const fileName  = [process.cwd(), path, `${name}.jsx`].join('/');
  let fileContent = config.es6 ? es6Template : es5Template;
  fileContent     = fileContent.replace('<% className %>', name);
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
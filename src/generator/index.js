'use strict';

const fs          = require('fs');
const _           = require('lodash');
const prompt      = require('prompt');
const camelize    = require('camelize');
const es6Template = fs.readFileSync([__dirname, 'templates/es6'].join('/'), 'utf8');
const es5Template = fs.readFileSync([__dirname, 'templates/es5'].join('/'), 'utf8');
const chalk       = require('chalk');

function writeFile(name, path, content) {

  //@todo: check if full path directory
  fs.writeFile(path, content, (err) => {
    if (err) {
      console.log(chalk.red('! Something went wrong while creating React Class file %s'), name);
      console.log(chalk.red('! %s'), err.message);
      process.exit(1);
    }
    console.log(chalk.green('* React Class %s created'), name);
  });
}

function compileFile(name, config) {
  let fileContent = config.es6 ? es6Template : es5Template;
  fileContent     = fileContent.replace('<% className %>', name);
  let imports     = '';
  _.forEach(config.import, (include) => {
    imports += config.es6 ? 'const ' : 'var ';
    imports += `${camelize(include)} = require('${include}');`;
    imports += '\n';
  });
  return fileContent.replace('<% imports %>', imports);
}

function generate(className, config) {
  const overwriteQuestion = 'file already exist, overwrite ? y/n';
  let rawPath             = className.split('/');
  let path                = _.dropRight(rawPath).join('/');
  let name                = _.last(rawPath).replace(`.${config.extension}`, '');
  let fileName            = [process.cwd(), path, `${name}.${config.extension}`].join('/').replace('//', '/');
  let fileExists          = false;
  let fileContent         = compileFile(name, config);

  try {
    //checking if file already exists
    fs.accessSync(fileName, fs.R_OK | fs.W_OK);
    fileExists = true;
  } catch (e) {
  }

  if (fileExists) {
    // if no errors file exists so we prompt for overwrite
    prompt.get([overwriteQuestion], function(err, result) {
      const response = result[overwriteQuestion];
      if (response === 'y') {
        fs.unlink(fileName, (err) => {
          if (err) {
            console.log(chalk.red('! Something went wrong while creating React Class file %s'), className);
            console.log(chalk.red('! %s'), err.message);
            process.exit(1);
          }
          writeFile(name, fileName, fileContent);
        });
      } else {
        console.log(chalk.yellow('* nothing done.'));
      }
    });
  } else {
    writeFile(name, fileName, fileContent);
  }
}

module.exports = {
  generate
};
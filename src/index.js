'use strict';

const fs           = require('fs');
const _            = require('lodash');
const prompt       = require('prompt');
const chalk        = require('chalk');
const generator    = require('./generator');
const configparser = require('./configparser');
const DEFAULT      = {
  "es6": false,
  "import": [],
  "extension": "jsx"
};

/**
 * creates config object from CLI args or config file
 * @param commander
 * @returns {{}}
 */
function getConfig(commander) {
  let config     = DEFAULT;
  let configPath = configparser.configPath();
  if (configPath !== null && !commander.ignore) {
    console.log(chalk.green('* Config file found, ignoring CLI args !'));
    return configparser.parse(configPath + '.reactpleaserc');
  } else {
    if (commander.ignore) {
      console.log(chalk.green('* Config file ignored'));
    } else {
      console.log(chalk.green('* No config file found'));
    }
    config['es6']       = commander.es6 ? commander.es6 : DEFAULT.es6;
    config['extension'] = commander.ext ? commander.ext : DEFAULT.extension;
    if (commander.import) {
      config['import'] = commander.import.split(',');
    }
  }

  return config;
}

function generateFile(className, config) {
  let file = null;

  try {
    file = generator.generate(className, config);
  } catch (e) {
    console.log(chalk.red('! Something went wrong while creating React Class file %s'), className);
  }
  if (file === null) {
    console.log(chalk.red('! Something went wrong while creating React Class file %s'), className);
  } else {
    console.log(chalk.green('* React Class %s created'), className);
  }
}

function run(commander) {
  let config              = getConfig(commander);
  let className           = commander.args[0];
  const overwriteQuestion = 'file already exist, overwrite ? y/n';
  const fileName          = [process.cwd(), `${className}.${config.extension}`].join('/');

  try {
    //checking if file already exists
    fs.accessSync(fileName);
    // if no errors file exists so we prompt for overwrite
    prompt.get([overwriteQuestion], function(err, result) {
      const response = result[overwriteQuestion];
      if (response === 'y') {
        generateFile(className, config);
      } else {
        console.log(chalk.yellow('* nothing done.'));
      }
    });
  } catch (e) {
    //file doesn't exisit we can write on fs
    generateFile(className, config);
  }
}

module.exports = {
  run
};
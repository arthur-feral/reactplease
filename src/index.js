'use strict';

const fs           = require('fs');
const _            = require('lodash');
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

function run(commander) {
  let config              = getConfig(commander);
  let className           = commander.args[0];

  generator.generate(className, config);
}

module.exports = {
  run
};
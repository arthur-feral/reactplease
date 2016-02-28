'use strict';

const generator    = require('./generator');
const configparser = require('./configparser');

function process(commander) {
  let config = {};
  if (!commander.ignore) {
    let configPath = configparser.configPath();
    if (configPath !== null) {
      config = configparser.parse(configPath + '.reactpleaserc');
    }
  }
  console.log(config);
}

module.exports = {
  process
};
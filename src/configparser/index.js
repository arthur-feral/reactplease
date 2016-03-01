'use strict';

const fs            = require('fs');
const findParentDir = require('find-parent-dir');
const chalk         = require('chalk');
let config          = {};

/**
 * parse reactplease config file and return parsed json object
 * @param filePath
 * @returns {{}}
 */
const parse = (filePath) => {
  let fileContent;
  console.log(chalk.yellow('* using %s'), filePath);
  try {
    fileContent = fs.readFileSync(filePath, 'utf8');
  } catch (e) {
    console.log(chalk.red(e.message));
    return {};
  }

  try {
    config = JSON.parse(fileContent);
  } catch (e) {
    console.log(chalk.red(e.message));
    return {};
  }

  return config;
};

const configPath = () => {
  let path = findParentDir.sync(process.cwd(), '.reactpleaserc');
  if (path !== null) {
    if (path[path.length - 1] !== '/') {
      path += '/';
    }
  }
  return path;
};

module.exports = {
  parse,
  configPath
};
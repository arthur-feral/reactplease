#!/usr/bin/env node
'use strict';

const commander   = require('commander');
const chalk       = require('chalk');
const reactplease = require('../src');
const packagejson = require('../package.json');

commander
  .version(packagejson.version)
  .usage('[options] <react class name>')
  .option('-i, --ignore', 'ignore .reactpleaserc file')
  .parse(process.argv);

//if (!commander.args.length) {
//  commander.help();
//} else {
//}
reactplease.process(commander);

process.exit(0);

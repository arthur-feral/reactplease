#!/usr/bin/env node
'use strict';

const commander   = require('commander');
const chalk       = require('chalk');
const reactplease = require('../src');
const packagejson = require('../package.json');

commander
  .version(packagejson.version)
  .usage('[options] [react class name]')
  .option('-i, --import <packages>', 'import special packages top of class file')
  .option('--ignore', 'ignore .reactpleaserc file')
  .option('--es6', 'use EcmaScript 6 syntax')
  .parse(process.argv);

if (!commander.args.length) {
  commander.help();
} else {
  reactplease.process(commander);

  process.exit(0);
}

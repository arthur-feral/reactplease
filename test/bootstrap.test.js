'use strict';

// You must require this file inside each tests
// or use mocha -r bootstrap.test.js
// (-r === require file)


// because JavaScript has a limited standard lib,
// we want to globally expose some libraries we use in every files
// instead of require them everytime. #tradeoff
global.assert = require('assert');
global.when = require('when');
global._ = require('lodash');
let chai = require('chai');
let sinonChai = require('sinon-chai');
global.chai = chai;
global.assert = chai.assert;
global.expect = chai.expect;
global.should = chai.should;
global.sinon = require('sinon');
chai.should();
chai.use(sinonChai);
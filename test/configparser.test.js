const mockfs         = require('mock-fs');
const configparser   = require('../src/configparser');
const mocksDir       = [__dirname, '/mocks/'].join('');
const configFileName = '.reactpleaserc';
const mockFilePath   = [mocksDir, configFileName].join('');
const fileContent    = '{"es6": true,"import": ["lodash","classnames"]}';

let reactpleasefile;

describe('configparser', () => {
  describe('#parse', () => {
    before(() => {
      mockfs({
        [mocksDir]: {
          [configFileName]: fileContent
        }
      });
      reactpleasefile = configparser.parse(mockFilePath);
    });

    after(() => {
      mockfs.restore();
      reactpleasefile = undefined;
    });
    context('config file exists', () => {
      it('loads the config file', (done) => {
        expect(reactpleasefile).to.have.property('es6');
        done();
      });
    });

    context('config file doesn\'t exist', () => {
      it('returns empty object', (done) => {
        reactpleasefile = configparser.parse(configFileName);
        expect(reactpleasefile).to.deep.equal({});
        done();
      });
    });
  });

  describe('#configPath', () => {

  });
});
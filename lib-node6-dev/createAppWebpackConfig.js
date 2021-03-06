'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _createOptions = require('./createOptions');

var _createOptions2 = _interopRequireDefault(_createOptions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function createAppWebpackConfig(createWebpackConfig) {
  const wrapCreateWebpackConfig = options => createWebpackConfig((0, _createOptions2.default)(options));

  return options => {
    const appWebpackConfigPath = _path2.default.resolve('createAppWebpackConfig.js');
    if ((0, _fs.existsSync)(appWebpackConfigPath)) {
      console.log('Using app createAppWebpackConfig.js');
      // eslint-disable-next-line import/no-dynamic-require, global-require
      const appWebpackConfigCreator = require(appWebpackConfigPath);
      if (typeof appWebpackConfigCreator !== 'function') {
        console.error('app createAppWebpackConfig.js should export a function\\nmodule.exports = function (config, options) { ... }');
      }

      options = (0, _createOptions2.default)(options);
      const config = appWebpackConfigCreator(wrapCreateWebpackConfig, options);

      if (typeof config !== 'object') {
        console.error('app createAppWebpackConfig.js should return the config\\nfunction (config, options) { return config; }');
      }

      return config;
    } else {
      return wrapCreateWebpackConfig(options);
    }
  };
};
//# sourceMappingURL=createAppWebpackConfig.js.map
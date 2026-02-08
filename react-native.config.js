const path = require('path');
const baseConfig = require('react-native/react-native.config');

module.exports = {
  ...baseConfig,
  reactNativePath: path.dirname(require.resolve('react-native/package.json'))
};

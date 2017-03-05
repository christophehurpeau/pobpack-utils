import { type OptionsType } from '../createOptions';

export default (webpackPrefixPackageFields: Array<string>, options: OptionsType) => ({
  modules: ['node_modules'],
  extensions: ['.js', '.jsx'],

  mainFields: [
    ...[].concat(...webpackPrefixPackageFields.map(prefix => ([
      options.env !== 'production' && `webpack:${prefix}-dev`,
      `webpack:${prefix}`,
    ]))),
    options.env !== 'production' && 'webpack:main-dev',
    'webpack:main',
    options.env !== 'production' && 'main-dev',
    'main',
  ].filter(Boolean),

  aliasFields: [
    ...[].concat(...webpackPrefixPackageFields.map(prefix => ([
      options.env !== 'production' && `webpack:aliases-${prefix}-dev`,
      `webpack:aliases-${prefix}`,
    ]))),
    options.env !== 'production' && 'webpack:aliases-dev',
    'webpack:aliases',
    'webpack',
  ].filter(Boolean),
});

module.exports = {
  stories: [
    '../src/**/*.stories.mdx',
    '../src/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    {
      name: '@storybook/addon-postcss',
      options: {
        cssLoaderOptions: {
          // When the css files are splitted over multiple files
          importLoaders: 1,
        },
        postcssLoaderOptions: {
          // When using PostCSS v8
          implementation: require('postcss'),
        },
      },
    },
  ],
  framework: '@storybook/react',
  core: { builder: 'webpack5' },
  staticDirs: ['../public'],
  typescript: { reactDocgen: false },
}

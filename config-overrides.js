const { override, addBabelPlugin } = require('customize-cra');

module.exports = override(
  addBabelPlugin([
    'babel-plugin-styled-components',
    {
      displayName: true,
      fileName: false,
      meaninglessFileNames: ['index', 'styles'],
      pure: true,
      ssr: true,
      namespace: 'pexels-masonry'
    }
  ])
); 
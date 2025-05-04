const webpack = require('webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const config = require('react-scripts/config/webpack.config');

// Create production build configuration
const prodConfig = config('production');

// Add bundle analyzer plugin
prodConfig.plugins.push(new BundleAnalyzerPlugin({
  analyzerMode: 'static',
  reportFilename: 'bundle-report.html',
  openAnalyzer: true,
  generateStatsFile: true,
  statsFilename: 'bundle-stats.json',
}));

// Run webpack
webpack(prodConfig, (err, stats) => {
  if (err || stats.hasErrors()) {
    console.error(err || stats.toString());
    process.exit(1);
  }
}); 
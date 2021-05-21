module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
    },
    devServer: {
        open: true,
        contentBase: './public',
        publicPath: '/dist',
    },
    devtool: 'eval-cheap-module-source-map',
};
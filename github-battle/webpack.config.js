// lol i hate webpack, it's always set up for me and i just try not to touch it in general
const path = require('path') // comes with node
const HtmlWebpackPlugin = require('html-webpack-plugin') // will auto-generate a copy of index.html that includes the script tag to include the bundle

module.exports = {
    // define entry point
    entry: './app/index.js',
    // where does the bundle go?
    output: {
        path: path.resolve(__dirname, 'dist'), // creates a dist folder at the root
        filename: 'index_bundle.js' // creates the output file for the bundle
    },
    // define the transformations we need to make
    module: {
        rules: [
            { test: /\.(js)$/, use: 'babel-loader' }, // use the babel-loader to transform all the .js files
            { test: /\.css$/, use: ['style-loader', 'css-loader'] } // use style loader (injecting style tags) and css-loader
        ]
    },
    mode: 'development',
    plugins: [
        new HtmlWebpackPlugin({
            template: 'app/index.html'
        })
    ]
}
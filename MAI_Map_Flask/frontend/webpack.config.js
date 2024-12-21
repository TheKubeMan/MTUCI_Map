const path = require('path');

module.exports = {
    entry: './src/main.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, '../static/js'),
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(glsl|vs|fs|vert|frag)$/i,
                use: ['raw-loader'],
            },
            {
                test: /\.(gltf|fbx|obj|mtl)$/i,
                type: 'asset/resource', 
              },
        ],
    },
    resolve: {
        extensions: ['.js'],
    },
};
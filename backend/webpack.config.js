const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = function (env,options) {
    const {mode} = options;
    return {
        stats: 'errors-warnings',
        entry: path.resolve(__dirname, 'src/index.ts'),
        output: {
            path: path.resolve(__dirname, 'build'),
            filename: 'build/[name].js',
            chunkFilename: 'build/[name].[contenthash:8].chunk.js',
        },
        watch: mode == "development",
        target: "node",
        devtool: mode == "production" ? 'source-map' : 'cheap-module-source-map',
        module: {
            rules: [
                {
                    test: /\.(ts)$/,
                    exclude: /node_modules/,
                    loader: "ts-loader",
                    options: {
                        transpileOnly: true
                    }
                }
            ]
        },
        optimization: {
            splitChunks: {
                chunks: 'all',
            }
        },
        resolve: {
            // Add `.ts` and `.tsx` as a resolvable extension.
            modules: ["node_modules"],
            extensions: [".ts"]
        },
        externals: [
            nodeExternals()
        ],
        plugins: [
        ]
    }
};
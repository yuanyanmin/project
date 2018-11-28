const path = require("path");
const webpack = require('webpack');
const ExtractPlugin = require('extract-text-webpack-plugin');
const HTMLPlugin = require('html-webpack-plugin');
var isDev = process.env.NODE_ENV === 'development';

const config = {
    target: "web",  //平台
    entry: path.join(__dirname, 'src/index.js'),  // 入口文件，_dirname 文件的根目录。join（） 拼接，保证可以以绝对路径访问
    output: {
        filename: "bundle.js",
        path: path.join(__dirname,'dist')
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(gif|jpg|jpeg|png|svg)$/,
                use: [
                    {
                        loader:'url-loader',
                        options:{
                            limit: 1024,
                            name:'[name].[ext]'
                        }
                    }
                ]
            },

            {
                test:/\.jsx$/,
                loader:'babel-loader'
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env':{
                NODE_ENV:isDev?'"development"':'"production"'
            }
        }),
        new HTMLPlugin()
    ]
};

if(isDev){
    config.module.rules.push(
    {
        test:/\.styl/,
            use:[
        'style-loader',
        'css-loader',
        {
            loader:'postcss-loader',
            options:{
                sourceMap:true,
            }
        },
        'stylus-loader'
    ]
    });
    config.devtool = '#cheap-module-eval-source-map';         //  调试页面，完整映射代码t关系
    config.devServer = {
        port: '8081',
        host: '0.0.0.0',
        overlay:{    // 页面显示错误
            error: true,
        },
        // historyFallback: {   // 没有映射的地址映射到index

        // },
        hot: true,    // 只重新渲染修改的组件内容，
        // open: true
    };
    config.plugins.push(                  // 热加载
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    )
}else {
    config.entry = {
        app: path.join(__dirname,'src/index.js'),
        vendor:['vue']
    };
    config.output.filename = '[name].[chunkhash:8].js';
    config.module.rules.push(
        {
            test:/\.styl/,
            use:ExtractPlugin.extract({
                fallback:'style-loader',
                use:[
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,
                        }
                    },
                    'stylus-loader',
                ]
            })
        },
    );
    config.plugins.push(
        new ExtractPlugin('styles.[contentHash:8].css'),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'runtime'
        }),
    )
}

module.exports = config;

# todo-app

Repo for the To-Do app exercise of The Odin Project

Practicing:
-the initial setup of a new project
-CSS styling
-Using class constuctors
-Object
-OOP principles (SRP)

# Initial setup

-Start by setting up npm and creating a package.json for configuration byu using

npm init -y

-Install webpack and webpack-cli

npm i -D webpack webpack-cli

-Create a webpack config file with initial config

touch webpack.config.js

const path = require('path')

module.exports = {
mode: "development",
entry: './src/index.js',
output: {
filename: 'main.js',
path: path.resolve(\_\_dirname, 'dist'),
}
}

-Make a source and distribution directory.

mkdir src
mkdir dist

-Put the index.js file in the ../src

-Install HtmlWebpackPlugin
This will automaticly create a index.html file and use all the script and css.

npm i -D html-webpack-plugin

-Add to the webpack.config file:

const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
plugins: [new HtmlWebpackPlugin()],
}

-Add Devtool to the webpack config to trace back errors to their original file.

devtool: "inline-source-map",

-Add scripts to the package.json file to be able to use scripts with npm run

"watch": "webpack --watch"
"build": "webpack"

-install style-loader and css-loader to handle styling files and add config to webpack.config.js

npm i -D style-loader css-loader

module.exports = {

module: {
rules: [
{
test:/\.css$/i,
use: ['style-loader', 'css-loader'],
}
]
}
}

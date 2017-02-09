// Webpack entry point.  Note the .babel.js extension-- this will be parsed
// through babel, using the `.babelrc` settings to transpile to your current
// version of Node

// ----------------------
// IMPORTS

// Node's built-in `path` module.  We'll use this to determine the `webpack`
// config directory relative to this file
import path from 'path';

// FitBit's [webpack-config](https://fitbit.github.io/webpack-config/) lib for
// breaking down complex configurations into multiple files for easier
// extensibility
import Config, { environment } from 'webpack-config';

// ----------------------

// Helper function that'll take the name of the config file, and throw back a
// fully-formed object that webpack will take as the final config to bundle
function load(file) {
  return new Config().extend(`[root]/${file}.js`).toObject();
}

// Set the 'root' path to the 'webpack' dir in this folder
environment.setAll({
  root: () => path.join(__dirname, 'webpack'),
});

// eslint-disable-next-line import/no-mutable-exports
let toExport;

// Spawning webpack will be done through an `npm run ...` command, so we'll
// map those npm options here to know which webpack config file to use
switch (process.env.npm_lifecycle_event) {
  case 'start':
    toExport = load('browser_dev');
    break;
  case 'build':
    toExport = load('browser_prod');
    break;
  case 'build-server':
    toExport = load('server');
    break;
  default:
    throw new Error('Invoke through npm only');
}

export default toExport;

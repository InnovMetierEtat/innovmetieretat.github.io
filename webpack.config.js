const path = require('path');

module.exports = {
  // webpack folder’s entry js — excluded from jekyll’s build process.
  entry: "./webpack/entry.js",
  output: {
    path: path.resolve(__dirname + "/assets/javascript/"),
    filename: "bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        //exclude: /(node_modules)/,
        loader: "babel-loader", // "babel-loader" is also a legal name to reference
        query: {
          presets: ["react", "env"],
          plugins: ["transform-class-properties"]
        }
      }
    ]
  }
};

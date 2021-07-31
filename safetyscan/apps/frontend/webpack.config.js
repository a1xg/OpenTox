module.exports = {
  entry: "./src/App.js",
  output: {
    filename: "main.js"
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: { loader: 'babel-loader' }
      },
      {
        test: /\.css$/ ,
        exclude: /node_modules/,
        use: [
          {
            loader:"style-loader"
          },
          {
            loader:"css-loader"
          }
        ] 
      }
    
    ]
  }
};

// TODO: 
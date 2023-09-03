const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  mode: "production",
  optimization: {
    splitChunks: {
      chunks: "all",
      minSize: 10000,
      maxSize: 250000,
    },
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
  //...
  devServer: {
    client: {
      overlay: {
        runtimeErrors: (error) => {
          if (error.message === "ResizeObserver loop limit exceeded") {
            console.log(error.message);
            return false;
          }
          return true;
        },
      },
    },
  },
};

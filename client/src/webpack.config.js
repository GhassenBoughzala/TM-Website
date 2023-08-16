module.exports = {
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

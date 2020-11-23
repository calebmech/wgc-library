module.exports = {
  images: {
    domains: ["books.google.com"],
  },
  webpack: (config) => {
    config.module.rules.unshift({
      test: /\.worker\.js$/,
      loader: "worker-loader",
    });

    return config;
  },
};

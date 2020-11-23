module.exports = {
  images: {
    domains: ["books.google.com"],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.worker\.js$/,
      use: { loader: "worker-loader" },
    });

    return config;
  },
};

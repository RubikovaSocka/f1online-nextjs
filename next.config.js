const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

/*
module.exports = {
  webpack: (config, { isServer }) => {
    // Fixes npm packages that depend on `fs` module
    if (!isServer) {
      config.node = {
        fs: 'empty'
      }
    }

    return config
  }
}*/
/*
module.exports = {
  images: {
    domains: ["wpadmin.f1online.sk"]
  }
};*/

module.exports = withBundleAnalyzer({
  images: {
    domains: ["wpadmin.f1online.sk"],
  },
});

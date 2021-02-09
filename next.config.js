/*const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

*/ /*
module.exports = {
  webpack: (config, { isServer }) => {
    // Fixes npm packages that depend on `fs` module
    if (isServer) {
      config.node = {
        target: "node",
//        fs: "empty",
  //      child_process: "empty",
      };
    }

    return config;
  },
};*/
/*
module.exports = {
  webpack: (config, { isServer }) => {
    // Fixes npm packages that depend on `fs` module

    config.node = {
      fs: "empty",
      net: "empty",
      tls: "empty",
      readline: "empty",
      child_process: "empty",
      //        fs: "empty",
      //      child_process: "empty",
    };

    return config;
  },
}; /*

webpack: (config, options) => {
  config.node = {
    fs: 'empty'
  }
}

*/
module.exports = {
  images: {
    domains: ["wpadmin.f1online.sk"]
  }
};
/*
module.exports = withBundleAnalyzer({
  images: {
    domains: ["wpadmin.f1online.sk"],
  },
});
*/

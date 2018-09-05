'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1535036213132_6720';

  // add your config here
  config.middleware = [];

  config.sequelize = {
    dialect: 'mysql',
    host: 'www.songshuyang.com',
    port: 3306,
    database: 'fixed-throwing',
    username: 'throwing',
    password: 'throwing_throwing',
  };

  config.passportGithub = {
    key: 'fbf21be0d0560546d940',
    secret: '50e0b4550ee045bf21a38a90d467135ff8908384',
    callbackURL: '/passport/github/callback',
    // proxy: false,
  };

  config.passportWeibo = {
    key: '2820940946',
    secret: '894ee6a181424bd76641af9fa7da18d3',
    callbackURL: '/passport/weibo/callback',
  };

  config.security = {
        csrf: {
            enable: false,
            // ignore: (ctx) => ['/api/user/login', '/api/user/logout'].includes(ctx.originalUrl),
        },
    };

    return config;
};


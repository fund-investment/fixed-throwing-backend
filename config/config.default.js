'use strict';

module.exports = appInfo => {
    const config = exports = {};

    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + '_1535036213132_6720';

    // add your config here
    config.middleware = [];

    config.passportGithub = {
        key: 'fbf21be0d0560546d940',
        secret: '50e0b4550ee045bf21a38a90d467135ff8908384',
        callbackURL: '/passport/github/callback',
        // proxy: false,
    };

    return config;
};


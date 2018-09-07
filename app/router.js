'use strict';

const passportInit = require('./passportInit');

module.exports = app => {
    app.router.get('/', 'home.render');
    app.router.get('/user', 'home.render');

    app.router.post('/api/user/login', 'user.login');
    app.router.post('/api/user/logout', 'user.logout');
    app.router.get('/api/user/get_auth', 'user.getAuthorization');
    app.router.get('/api/user/current', 'user.getCurrentUser');
    passportInit(app.passport);
};

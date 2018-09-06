'use strict';

const assert = require('assert');

module.exports = app => {
  app.router.get('/', 'home.render');
  app.router.get('/user', 'home.render');

  app.router.post('/api/user/login', 'user.login');
    app.router.post('/api/user/logout', 'user.logout');
  app.router.get('/api/user/get_auth', 'user.getAuthorization');

  app.passport.mount('weibo');
  app.passport.mount('github');
  // app.passport.mount('bitbucket');
  // app.passport.mount('twitter');

  app.passport.verify(async (ctx, user) => {
    // 检查用户
    assert(user.provider, 'user.provider should exists');
    assert(user.id, 'user.id should exists');

    // 从数据库中查找用户信息
    //
    // Authorization Table
    // column   | desc
    // ---      | --
    // provider | provider name, like github, twitter, facebook, weibo and so on
    // uid      | provider unique id
    // user_id  | current application user id
    const auth = await ctx.model.Authorization.findOne({
      where: {user_id: user.id,
      }
    });
    const existsUser = auth ? await ctx.model.User.findOne({ where: {id: auth.user_id ,
                origin: user.provider,
            }}) : false;
    if (existsUser) {
      return existsUser;
    }
    // 调用 service 注册新用户
    return await ctx.service.user.register(user);
  });
  // app.passport.authenticate('',{successRedirect:'/'} );

  // 将用户信息序列化后存进 session 里面，一般需要精简，只保存个别字段
  app.passport.serializeUser(async (ctx, user) => {
    // 处理 user
    // ...
    // return user;
  });

  // 反序列化后把用户信息从 session 中取出来，反查数据库拿到完整信息
  app.passport.deserializeUser(async (ctx, user) => {
    // 处理 user
    // ...
    // return user;
  });
};

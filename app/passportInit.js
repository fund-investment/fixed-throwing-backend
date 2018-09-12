/** Created by YangXiaozhe on 2018/9/7 */
const assert = require('assert');

module.exports = (passport) => {
    passport.mount('weibo');
    passport.mount('github');
    // passport.mount('bitbucket');
    // passport.mount('twitter');

    passport.verify(async (ctx, user) => {
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
            where: {
                user_id: user.id,
            }
        });
        const existsUser = auth ? await ctx.model.User.findOne({
            where: {
                id: auth.user_id,
                provider: user.provider,
            }
        }) : undefined;
        if (existsUser) {
            return existsUser;
        }
        // 调用 service 注册新用户
        return await ctx.service.user.register(user);
    });
    passport.authenticate('',{successRedirect:'/'} );

    // 将用户信息序列化后存进 session 里面，一般需要精简，只保存个别字段
    passport.serializeUser(async (ctx, user) => {
        // 处理 user
        // ...
        return user;
    });

    // 反序列化后把用户信息从 session 中取出来，反查数据库拿到完整信息
    passport.deserializeUser(async (ctx, user) => {
        // 处理 user
        // ...
        return user;
    });
};



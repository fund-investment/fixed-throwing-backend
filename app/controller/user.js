'use strict';

const Controller = require('egg').Controller;
const md5 = require('md5');

class UserController extends Controller {
    async logout() {
        const ctx = this.ctx;
        try {
            ctx.logout();
        }
        catch (e) {
            // 在没有session的情况下强行logout，会进入error
            console.error(e)
        }
        ctx.body = {status: 'ok'};
    }

    async login(user) {
        // TODO
        const ctx = this.ctx;
        ctx.model.User.findOne({
            where: {
                username: user.userName,
            },
            include: [{
                model: ctx.model.Password,
                where: {user_id: Sequelize.col('user.id'), password: md5(user.password)}
            }]
        });

        ctx.login(user);
        ctx.redirect(ctx.get('referer') || '/');
    }

    async getAuthorization() {
        const {ctx, service} = this;
        const {user} = ctx.session.passport || {};
        const auth = await service.authorization.getAuth(user ? user.id : 'non-existent-user');
        ctx.body = {auth};
    }

    async getCurrentUser() {
        const {ctx, service} = this;
        const {user} = ctx.session.passport;
        const currentUser = await service.user.query(user.id);
        currentUser.dataValues.avatar = user.photo;
        currentUser.dataValues.userid = user.id;
        ctx.body = currentUser;
    }
}

module.exports = UserController;

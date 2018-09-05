'use strict';

const Controller = require('egg').Controller;
const md5 = require('md5');

class UserController extends Controller {
    async logout() {
        const ctx = this.ctx;

        ctx.logout();
        ctx.redirect(ctx.get('referer') || '/');
    }

    async login(user) {
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
        const {userId} = ctx.session;
        const auth = await service.authorization.getAuth(userId);
        ctx.body = {auth};
    }
}

module.exports = UserController;

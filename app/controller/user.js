'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  async logout() {
    const ctx = this.ctx;

    ctx.logout();
    ctx.redirect(ctx.get('referer') || '/');
  }

    async getAuthorization() {
        const { ctx, service } = this;
        const { userId } = ctx.session;
        const auth = await service.authorization.getAuth(userId);
        ctx.body = {auth};
    }
}

module.exports = UserController;

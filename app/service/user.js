/** Created by YangXiaozhe on 2018/8/31 */
'use strict';

const Service = require('egg').Service;

class UserService extends Service {
    async query(id) {
        return await this.ctx.model.User.findOne({where: {id}});
    }

    async register(user) {
        const newUser = await this.ctx.model.User.create(user);
        await this.ctx.model.Authorization.create({user_id: user.id, authority: 'member'});
        return newUser;
    }
}

module.exports = UserService;

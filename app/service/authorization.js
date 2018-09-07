/** Created by YangXiaozhe on 2018/8/31 */
'use strict';

const Service = require('egg').Service;

class AuthorizationService extends Service {
    async query(userId) {
        return await this.ctx.model.Authorization.findOne({where: {user_id: userId}});
    }

    async getAuth(userId) {
        const authObj = await this.query(userId);
        return authObj ? authObj.authority : 'guest';
     }
}

module.exports = AuthorizationService;

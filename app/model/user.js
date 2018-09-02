'use strict';

module.exports = app => {
    const { STRING, INTEGER, DATE } = app.Sequelize;

    return app.model.define('user', {
        id: {type: INTEGER, primaryKey: true, autoIncrement: true},
        username: STRING(30),
        nickname: STRING(30),
        password: STRING(30),
        email: STRING(50),
        phone: STRING(30),
        avatar: STRING(30),
        origin: STRING(10),
        created_at: DATE,
        updated_at: DATE,
    });
};

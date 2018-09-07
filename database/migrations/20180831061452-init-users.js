'use strict';

module.exports = {
  // 在执行数据库升级时调用的函数，创建 users, authorizations 表
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING } = Sequelize;
    await queryInterface.createTable('users', {
      id: { type: STRING(100), primaryKey: true },
      name: STRING(100),
      displayName: STRING(100),
      password: STRING(30),
      email: STRING(50),
      telephone: STRING(20),
      photo: STRING(100),
      provider: STRING(100),
      created_at: DATE,
      updated_at: DATE,
    });
    await queryInterface.createTable('authorizations', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      user_id: STRING(100),
      authority: STRING(100),
      created_at: DATE,
      updated_at: DATE,
    });
      await queryInterface.createTable('passwords', {
          id: { type: INTEGER, primaryKey: true, autoIncrement: true },
          user_id: STRING(100),
          password: STRING(100),
          created_at: DATE,
          updated_at: DATE,
      });
  },
  // 在执行数据库降级时调用的函数，删除 users, authorizations 表
  down: async queryInterface => {
    await queryInterface.dropTable('users');
    await queryInterface.dropTable('authorizations');
    await queryInterface.dropTable('passwords');
  },
};

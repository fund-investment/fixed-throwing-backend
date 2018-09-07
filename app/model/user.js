'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  return app.model.define('user', {
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
};

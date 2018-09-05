/** Created by YangXiaozhe on 2018/8/31 */
'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  return app.model.define('authorization', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    user_id: INTEGER,
    authority: STRING(30),
    created_at: DATE,
    updated_at: DATE,
  });
};

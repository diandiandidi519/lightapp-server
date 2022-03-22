const UserModel = require('./UserModel')
const RoleModel = require('./RoleModel')
const RoleUserModel = require('./RoleUserModel')

UserModel.belongsToMany(RoleModel, { through: 'role_user', foreignKey: 'user_id' })
RoleModel.belongsToMany(UserModel, { through: 'role_user', foreignKey: 'role_id' })

/**
 * @description role model

 */

const seq = require('../db/seq/seq')
const { STRING, INTEGER } = require('../db/seq/types')

const UserModel = require('./UserModel')
const RoleModel = require('./RoleModel')

const RoleUser = seq.define('role_user', {
    user_id: {
        type: INTEGER,
        allowNull: false,
    },
    role_id: {
        type: INTEGER,
        allowNull: false,
    },
})
// RoleUser.belongsToMany(UserModel, {
//     through: 'user_id',
// })
// RoleUser.belongsToMany(RoleModel, {
//     through: 'role_id',
// })
module.exports = RoleUser

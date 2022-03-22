/**
 * @description role model

 */

const seq = require('../db/seq/seq')
const { STRING, INTEGER } = require('../db/seq/types')

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
module.exports = RoleUser

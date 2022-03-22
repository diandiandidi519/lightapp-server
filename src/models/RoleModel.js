/**
 * @description role model

 */

const seq = require('../db/seq/seq')
const { STRING, INTEGER, ENUM } = require('../db/seq/types')

const Role = seq.define('role', {
    rolename: {
        type: STRING,
        allowNull: false,
    },
    status: {
        type: ENUM,
        allowNull: false,
        defaultValue: '1',
        values: ['0', '1'],
        comment: '状态：0-删除，1-正常',
    },
    order: {
        type: INTEGER,
        comment: '排序',
    },
    desc: {
        type: STRING,
        comment: '描述',
    },
})
module.exports = Role

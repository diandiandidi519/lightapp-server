/**
 * @description permission model

 */

const seq = require('../db/seq/seq')
const { STRING, INTEGER, ENUM } = require('../db/seq/types')

const Permission = seq.define('permission', {
    appname: {
        type: STRING,
        unique: 'appname', // 不要用 unique: true, https://www.chaoswork.cn/1064.html
        comment: '权限名称，唯一',
    },
    permissionname: {
        type: STRING,
        allowNull: false,
        unique: 'username', // 不要用 unique: true, https://www.chaoswork.cn/1064.html
        comment: '权限名称，唯一',
    },
    parent_id: {
        type: INTEGER,
        allowNull: false,
        comment: '父节点',
    },
    order: {
        type: INTEGER,
        allowNull: false,
        comment: '菜单排序',
    },
    path: {
        type: STRING,
        allowNull: false,
        comment: '菜单路径',
    },
    state: {
        type: ENUM,
        allowNull: false,
        comment: '当前应用状态，上架还是下架 0下架 1上架',
        values: ['0', '1'],
        default: '1',
    },
    is_app: {
        type: ENUM,
        allowNull: false,
        comment: '是否是一个应用 0只是菜单 1是应用 ',
        values: ['0', '1'],
        default: '0',
    },
})

module.exports = Permission

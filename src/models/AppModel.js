/**
 * @description app model

 */

const seq = require('../db/seq/seq')
const { STRING, INTEGER, ENUM } = require('../db/seq/types')

const Permission = seq.define('application', {
    appname: {
        type: STRING,
        allowNull: false,
        unique: 'appname', // 不要用 unique: true, https://www.chaoswork.cn/1064.html
        comment: '应用关键字，唯一',
    },
    textname: {
        type: STRING,
        allowNull: false,
        comment: '应用名称',
    },
    order: {
        type: INTEGER,
        allowNull: false,
        comment: '排序',
    },
    state: {
        type: ENUM,
        allowNull: false,
        comment: '当前应用状态，上架还是下架 0下架 1上架',
        values: ['0', '1'],
        default: '1',
    },
})

module.exports = Permission

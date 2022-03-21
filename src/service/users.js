/**
 * @description user 数据操作

 */

const _ = require('lodash')
const { Op } = require('sequelize')
const UserModel = require('../models/UserModel')
const RoleUserModel = require('../models/RoleUserModel')
const RoleModel = require('../models/RoleModel')

/**
 * 查找用户信息
 * @param {Object} param0 查询参数
 */
async function findUserService(whereOpt = {}, pagination) {
    // 屏蔽掉删除的
    if (whereOpt.status == null) {
        Object.assign(whereOpt, {
            status: {
                [Op.ne]: 0,
            },
        })
    }

    if (whereOpt.username) {
        Object.assign(whereOpt, {
            username: {
                [Op.like]: `%${whereOpt.username}`,
            },
        })
    }

    const result = await UserModel.findAndCountAll({
        order: [
            ['id', 'desc'], // 倒序
            // ['order', 'desc'], // 倒序
        ],
        where: whereOpt,
        include: [RoleModel],
        ...pagination,
    })

    // result.count 总数，忽略了 limit 和 offset
    // result.rows 查询结果，数组
    const list = result.rows.map(row => row.dataValues)

    return {
        count: result.count,
        list,
    }
}
/**
 * 查找用户信息
 * @param {Object} param0 查询参数
 */
async function findOneUserService({ username, password, phoneNumber }) {
    // 拼接查询条件
    const whereOpt = {}
    if (username) {
        Object.assign(whereOpt, { username })
    }
    if (password) {
        // 用户名和密码在一块，因为密码可能重复
        Object.assign(whereOpt, { username, password })
    }
    if (phoneNumber) Object.assign(whereOpt, { phoneNumber })

    // 无查询条件，则返回空
    if (_.isEmpty(whereOpt)) return null

    // 查询
    const result = await UserModel.findOne({
        where: whereOpt,
    })
    if (result == null) {
        // 未查到用户
        return result
    }

    // 返回查询结果
    return result.dataValues
}

/**
 * 创建用户
 * @param {Object} data 用户信息，要符合 UserModel 的属性
 */
async function createUserService(data = {}) {
    const result = await UserModel.create(data)
    return result.dataValues
}

/**
 * 修改用户信息
 * @param {object} data 用户信息，要符合 UserModel 的属性
 * @param {string} username username
 * @returns {boolean} true/false
 */
async function updateUserInfoService(data = {}, where) {
    if (_.isEmpty(where)) return false
    if (_.isEmpty(data)) return false
    if (_.isEmpty(data)) return false // 没有要修改的
    const result = await UserModel.update(data, {
        where,
    })
    return result[0] !== 0
}
/**
 * 修改用户信息
 * @param {object} data 用户信息，要符合 UserModel 的属性
 * @param {string} username username
 * @returns {boolean} true/false
 */
async function updateUserRoleService(id, roles) {
    if (_.isEmpty(id)) return false
    if (_.isEmpty(roles)) return false
    // 先删除之前的角色
    await RoleUserModel.destroy({ where: { user_id: id } })
    const roleList = await RoleUserModel.bulkCreate(
        roles.map(item => ({ user_id: id, role_id: item }))
    )
    return roleList
}

module.exports = {
    findOneUserService,
    createUserService,
    updateUserInfoService,
    findUserService,
    updateUserRoleService,
}

/**
 * @description role service

 */

const { Op } = require('sequelize')
const _ = require('lodash')
const RoleModel = require('../models/RoleModel')

/**
 * 创建角色
 * @param {object} data 角色数据
 */
async function createRoleService(data = {}) {
    const newRole = await RoleModel.create(data)
    return newRole.dataValues
}

/**
 * 更新角色
 * @param {object} data 要更新的数据
 * @param {object} whereOpt 查询条件
 */
async function updateRoleService(data = {}, whereOpt = {}) {
    if (_.isEmpty(whereOpt)) return false
    if (_.isEmpty(data)) return false

    const result = await RoleModel.update(data, { where: whereOpt })

    return result[0] !== 0
}

/**
 * 查询角色
 * @param {object} whereOpt 查询条件
 */
async function findRolesService(whereOpt = {}, pagination) {
    // 屏蔽掉删除的
    if (whereOpt.status == null) {
        Object.assign(whereOpt, {
            status: {
                [Op.ne]: 0,
            },
        })
    }

    if (whereOpt.rolename) {
        Object.assign(whereOpt, {
            rolename: {
                [Op.like]: `%${whereOpt.rolename}`,
            },
        })
    }

    const result = await RoleModel.findAndCountAll({
        order: [
            ['id', 'desc'], // 倒序
            ['order', 'desc'], // 倒序
        ],
        where: whereOpt,
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

module.exports = {
    createRoleService,
    updateRoleService,
    findRolesService,
}

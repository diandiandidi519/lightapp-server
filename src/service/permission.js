/**
 * @description permission service

 */

const { Op } = require('sequelize')
const _ = require('lodash')
const PermissionModel = require('../models/PermissionModel')

/**
 * 创建权限
 * @param {object} data 权限数据
 */
async function createPermissionService(data = {}) {
    const newPermission = await PermissionModel.create(data)
    return newPermission.dataValues
}

/**
 * 更新权限
 * @param {object} data 要更新的数据
 * @param {object} whereOpt 查询条件
 */
async function updatePermissionService(data = {}, whereOpt = {}) {
    if (_.isEmpty(whereOpt)) return false
    if (_.isEmpty(data)) return false

    const result = await PermissionModel.update(data, { where: whereOpt })

    return result[0] !== 0
}

/**
 * 查询权限
 * @param {object} whereOpt 查询条件
 */
async function findPermissionsService(whereOpt = {}) {
    // 屏蔽掉删除的
    if (whereOpt.status == null) {
        Object.assign(whereOpt, {
            status: {
                [Op.ne]: 0,
            },
        })
    }

    const result = await PermissionModel.findAndCountAll({
        order: [
            ['id', 'order'], // 倒序
        ],
        where: whereOpt,
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
    createPermissionService,
    updatePermissionService,
    findPermissionsService,
}

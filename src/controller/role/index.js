/**
 * @description controller role
 */

const { createRoleService, updateRoleService, findRolesService } = require('../../service/role')
const {
    createRoleFailInfo,
    createRoleDbErrorFailInfo,
    updateRoleFailInfo,
    updateRoleDbErrorFailInfo,
    findRoleListFailInfo,
} = require('../../res-model/failInfo/index')
const { ErrorRes, SuccessRes } = require('../../res-model/index')

/**
 * 创建角色
 * @param {object} data 角色数据
 */
async function createRole(data = {}) {
    const { rolename } = data
    if (!rolename) return new ErrorRes(createRoleFailInfo, '角色名称不能为空')

    let result
    try {
        result = await createRoleService(data)
    } catch (ex) {
        console.error('创建角色错误', ex)
        return new ErrorRes(createRoleDbErrorFailInfo)
    }

    if (result == null) return new ErrorRes(createRoleFailInfo)
    return new SuccessRes(result)
}

/**
 * 删除角色
 * @param {string} id id
 */
async function deleteRole(id) {
    if (!id) return new ErrorRes(updateRoleFailInfo, 'id 不能为空')

    let result
    try {
        result = await updateRoleService(
            {
                status: 0, // 假删除，实际更新 status
            },
            {
                id,
            }
        )
    } catch (ex) {
        console.error('删除角色错误', ex)
        return new ErrorRes(updateRoleDbErrorFailInfo)
    }

    if (result) return new SuccessRes() // 成功
    return new ErrorRes(updateRoleFailInfo)
}

/**
 * 更新角色
 * @param {string} id id
 * @param {obj} info 更新的信息
 */
async function updateRole(id, info) {
    if (!id) return new ErrorRes(updateRoleFailInfo, 'id不能为空')

    let result
    try {
        result = await updateRoleService(info, { id })
    } catch (ex) {
        console.error('更新角色错误', ex)
        return new ErrorRes(updateRoleDbErrorFailInfo)
    }

    if (result) return new SuccessRes() // 成功
    return new ErrorRes(updateRoleFailInfo)
}

/**
 * 获取角色列表
 * @param {string} workId 作品 id
 */
async function getRole({ current = 1, pageSize = 20, ...rest }) {
    const result = await findRolesService(rest, {
        offset: Number(current) - 1,
        limit: Number(pageSize),
    })

    return new SuccessRes(result)
}

module.exports = {
    createRole,
    deleteRole,
    updateRole,
    getRole,
}

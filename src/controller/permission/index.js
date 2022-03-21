/**
 * @description controller permission
 */

const {
    createPermissionService,
    updatePermissionService,
    findPermissionsService,
} = require('../../service/permission')
const {
    createPermissionFailInfo,
    createPermissionDbErrorFailInfo,
    updatePermissionFailInfo,
    updatePermissionDbErrorFailInfo,
    findPermissionListFailInfo,
} = require('../../res-model/failInfo/index')
const { ErrorRes, SuccessRes } = require('../../res-model/index')

/**
 * 创建权限
 * @param {object} data 权限数据
 */
async function createPermission(data = {}) {
    const { workId, name } = data
    if (!workId || !name) return new ErrorRes(createPermissionFailInfo, '标题和作品 id 不能为空')

    let result
    try {
        result = await createPermissionService(data)
    } catch (ex) {
        console.error('创建权限错误', ex)
        return new ErrorRes(createPermissionDbErrorFailInfo)
    }

    if (result == null) return new ErrorRes(createPermissionFailInfo)
    return new SuccessRes(result)
}

/**
 * 删除权限
 * @param {string} id id
 */
async function deletePermission(id) {
    if (!id) return new ErrorRes(updatePermissionFailInfo, 'id 不能为空')

    let result
    try {
        result = await updatePermissionService(
            {
                status: 0, // 假删除，实际更新 status
            },
            {
                id,
            }
        )
    } catch (ex) {
        console.error('删除权限错误', ex)
        return new ErrorRes(updatePermissionDbErrorFailInfo)
    }

    if (result) return new SuccessRes() // 成功
    return new ErrorRes(updatePermissionFailInfo)
}

/**
 * 更新权限
 * @param {string} id id
 * @param {string} name 名称
 */
async function updatePermissionName(id, name) {
    if (!id || !name) return new ErrorRes(updatePermissionFailInfo, 'id 和名称不能为空')

    let result
    try {
        result = await updatePermissionService({ name }, { id })
    } catch (ex) {
        console.error('更新权限错误', ex)
        return new ErrorRes(updatePermissionDbErrorFailInfo)
    }

    if (result) return new SuccessRes() // 成功
    return new ErrorRes(updatePermissionFailInfo)
}

/**
 * 获取作品的权限列表
 * @param {string} workId 作品 id
 */
async function getPermissions() {
    const result = await findPermissionsService({})

    return new SuccessRes(result)
}

module.exports = {
    createPermission,
    deletePermission,
    updatePermissionName,
    getPermissions,
}

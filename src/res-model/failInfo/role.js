/**
 * @description res 错误信息配置 role

 */

// errno: 1500x

module.exports = {
    // 创建角色失败
    createRoleFailInfo: {
        errno: 15001,
        message: '创建角色失败',
    },

    // 创建角色失败 数据库错误
    createRoleDbErrorFailInfo: {
        errno: 15002,
        message: '创建角色失败 db error',
    },

    // 更新/删除 角色失败
    updateRoleFailInfo: {
        errno: 15003,
        message: '更新/删除 角色失败',
    },

    // 更新/删除 角色失败 数据库错误
    updateRoleDbErrorFailInfo: {
        errno: 15004,
        message: '更新/删除 角色失败 db error',
    },

    // 获取角色列表失败
    findRoleListFailInfo: {
        errno: 15005,
        message: '获取角色列表失败',
    },
}

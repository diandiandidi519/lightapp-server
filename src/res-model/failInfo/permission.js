/**
 * @description res 错误信息配置 permission

 */

// errno: 1500x

module.exports = {
  // 创建权限失败
  createPermissionFailInfo: {
    errno: 15001,
    message: '创建权限失败',
  },

  // 创建权限失败 数据库错误
  createPermissionDbErrorFailInfo: {
    errno: 15002,
    message: '创建权限失败 db error',
  },

  // 更新/删除 权限失败
  updatePermissionFailInfo: {
    errno: 15003,
    message: '更新/删除 权限失败',
  },

  // 更新/删除 权限失败 数据库错误
  updatePermissionDbErrorFailInfo: {
    errno: 15004,
    message: '更新/删除 权限失败 db error',
  },

  // 获取权限列表失败
  findPermissionListFailInfo: {
    errno: 15005,
    message: '获取权限列表失败',
  },
}

/**
 * @description 数据校验 权限

 */

const strRule = {
  type: 'string',
  maxLength: 255,
}

module.exports = {
  type: 'object',
  // 用户信息要符合 ChannelModel 配置
  required: ['permissionname'],
  properties: {
    permissionname: strRule,
  },
}

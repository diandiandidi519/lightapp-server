/**
 * @description 数据校验 channel

 */

const strRule = {
    type: 'string',
    maxLength: 255,
}
const numRule = {
    type: 'number',
}

module.exports = {
    type: 'object',
    // 用户信息要符合 ChannelModel 配置
    required: ['name'],
    properties: {
        name: strRule,
        workId: numRule,
    },
}

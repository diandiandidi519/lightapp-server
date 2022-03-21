/**
 * @description 数据校验 users

 */

// 手机号规则
const phoneNumberRule = {
    type: 'string',
    pattern: '^1[34578]\\d{9}$', // 手机号正则
}

// 手机号 schema
const phoneNumberSchema = {
    type: 'object',
    required: ['phoneNumber'],
    properties: {
        phoneNumber: phoneNumberRule,
        isRemoteTest: {
            type: 'boolean',
        },
    },
}

// 手机号 + 短信验证码 schema
const phoneNumberVeriCodeSchema = {
    type: 'object',
    required: ['phoneNumber', 'veriCode'],
    properties: {
        phoneNumber: phoneNumberRule,
        veriCode: {
            type: 'string',
            pattern: '^\\d{4}$', // 四位数字
        },
    },
}
// 手机号 + 密码 schema
const usernameVeriCodeSchema = {
    type: 'object',
    required: ['username', 'password'],
    properties: {
        username: {
            type: 'string',
        },
        password: {
            type: 'string',
        },
    },
}

// 用户信息 schema
const userInfoSchema = {
    type: 'object',
    // 用户信息要符合 UserModel 配置
    required: ['nickName', 'gender'],
    properties: {
        nickName: {
            type: 'string',
        },
        gender: {
            type: 'string', // 整数
            maxLength: 1,
            minLength: 1,
            pattern: '[012]',
        },
        picture: {
            type: 'string',
            nullable: true,
        },
        city: {
            type: 'string',
        },
        roles: {
            type: 'array',
        },
    },
}

module.exports = {
    phoneNumberSchema,
    phoneNumberVeriCodeSchema,
    userInfoSchema,
    usernameVeriCodeSchema,
}

/**
 * @description users router

 */

const router = require('koa-router')()
const { SuccessRes } = require('../res-model/index')

// 中间件
const loginCheck = require('../middlewares/loginCheck')
const genValidator = require('../middlewares/genValidator')
const {
    phoneNumberSchema,
    phoneNumberVeriCodeSchema,
    userInfoSchema,
    usernameVeriCodeSchema,
} = require('../validator/users')

// controller
const sendVeriCode = require('../controller/users/sendVeriCode')
const updateUserInfo = require('../controller/users/updateUserInfo')

const users = require('../controller/users')

// 路由前缀
router.prefix('/api/users')

// 生成短信验证码
router.post('/genVeriCode', genValidator(phoneNumberSchema), async ctx => {
    const { phoneNumber, isRemoteTest } = ctx.request.body

    // 尝试发送验证码
    const res = await sendVeriCode(phoneNumber, isRemoteTest)

    ctx.body = res
})

// 使用手机号登录
router.post('/loginByPhoneNumber', genValidator(phoneNumberVeriCodeSchema), async ctx => {
    const { phoneNumber, veriCode } = ctx.request.body
    const res = await users.loginByPhoneNumber(phoneNumber, veriCode)
    ctx.body = res
})
// 使用账号登录
router.post('/loginByAccount', genValidator(usernameVeriCodeSchema), async ctx => {
    const { username, password } = ctx.request.body
    const res = await users.loginByAccount(username, password)
    ctx.body = res
})

// 获取用户信息
router.get('/getUserInfo', loginCheck, async ctx => {
    // 经过了 loginCheck ，用户信息在 ctx.userInfo 中
    ctx.body = new SuccessRes(ctx.userInfo)
})

// 修改用户信息
router.patch('/updateUserInfo', loginCheck, genValidator(userInfoSchema), async ctx => {
    // 经过了 loginCheck ，用户信息在 ctx.userInfo 中
    const res = await updateUserInfo(ctx.userInfo, ctx.request.body)
    ctx.body = res
})

// 获取用户列表
router.get('/', loginCheck, async ctx => {
    const res = await users.getUser(ctx.request.query)
    ctx.body = res
})
// 创建用户
router.post('/', loginCheck, genValidator(userInfoSchema), async ctx => {
    const res = await users.createUser(ctx.request.body)
    ctx.body = res
})

// 删除用户 一个
router.delete('/:id', loginCheck, async ctx => {
    const { id } = ctx.params
    const res = await users.deleteUser(id)
    ctx.body = res
})
// 删除用户 多个
router.delete('/', loginCheck, async ctx => {
    const { ids } = ctx.request.body
    const res = await users.deleteUser(ids)
    ctx.body = res
})

// 更新用户名称
router.put('/:id', loginCheck, genValidator(userInfoSchema), async ctx => {
    const { id } = ctx.params
    const { city, gender, nickName, phoneNumber, picture, username, roles } = ctx.request.body
    const res = await users.updateUser(
        id,
        {
            city,
            gender,
            nickName,
            phoneNumber,
            picture,
            username,
        },
        roles
    )
    ctx.body = res
})

module.exports = router

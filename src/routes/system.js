/**
 * @description system router

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
} = require('../validator/users')

// controller
const sendVeriCode = require('../controller/users/sendVeriCode')
const updateUserInfo = require('../controller/users/updateUserInfo')

// 路由前缀
router.prefix('/api/system')

// 获取菜单列表
router.get('/menuList', loginCheck, async ctx => {
    const res = await updateUserInfo(ctx.userInfo, ctx.request.body)
    ctx.body = res
})

module.exports = router

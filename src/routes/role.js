/**
 * @description 路由 role

 */

const router = require('koa-router')()

// 中间件
const loginCheck = require('../middlewares/loginCheck')
const genValidator = require('../middlewares/genValidator')
const roleSchema = require('../validator/role')

// controller
const { getRole, createRole, deleteRole, updateRole } = require('../controller/role/index')

// 路由前缀
router.prefix('/api/role')

// 创建角色
router.get('/', loginCheck, async ctx => {
    const res = await getRole(ctx.request.query)
    ctx.body = res
})
// 创建角色
router.post('/', loginCheck, genValidator(roleSchema), async ctx => {
    const res = await createRole(ctx.request.body)
    ctx.body = res
})

// 删除角色 一个
router.delete('/:id', loginCheck, async ctx => {
    const { id } = ctx.params
    const res = await deleteRole(id)
    ctx.body = res
})
// 删除角色 多个
router.delete('/', loginCheck, async ctx => {
    const { ids } = ctx.request.body
    const res = await deleteRole(ids)
    ctx.body = res
})

// 更新角色名称
router.put('/:id', loginCheck, genValidator(roleSchema), async ctx => {
    const { id } = ctx.params
    const { rolename, order, desc } = ctx.request.body
    const res = await updateRole(id, { rolename, order, desc })
    ctx.body = res
})

module.exports = router

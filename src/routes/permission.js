/**
 * @description 路由 permission

 */

const router = require('koa-router')()

// 中间件
const loginCheck = require('../middlewares/loginCheck')
const genValidator = require('../middlewares/genValidator')
const permissionSchema = require('../validator/permission')

// controller
const {
    createPermission,
    deletePermission,
    updatePermission,
    getPermissions,
} = require('../controller/permission/index')

// 路由前缀
router.prefix('/api/permission')

// 创建权限
router.post('/', loginCheck, genValidator(permissionSchema), async ctx => {
    const res = await createPermission(ctx.request.body)
    ctx.body = res
})

// 删除权限
router.delete('/:id', loginCheck, async ctx => {
    const { id } = ctx.params
    const res = await deletePermission(id)
    ctx.body = res
})

// 更新权限名称
router.patch('/updateName/:id', loginCheck, genValidator(permissionSchema), async ctx => {
    const { id } = ctx.params
    const { name } = ctx.request.body
    const res = await updatePermission(id, name)
    ctx.body = res
})

// 根据一个作品的所有渠道
router.get('/getPermission', loginCheck, async ctx => {
    // const res = await getPermissions()
    ctx.body = {
        errno: 0,
        data: [
            {
                path: '/user',
                layout: false,
                routes: [
                    {
                        path: '/user/login',
                        layout: false,
                        name: 'login',
                        component: './user/Login',
                    },
                    {
                        path: '/user',
                        redirect: '/user/login',
                    },
                    {
                        name: 'register-result',
                        icon: 'smile',
                        path: '/user/register-result',
                        component: './user/register-result',
                    },
                    {
                        name: 'register',
                        icon: 'smile',
                        path: '/user/register',
                        component: './user/register',
                    },
                    {
                        component: '404',
                    },
                ],
            },
            {
                path: '/dashboard',
                name: 'dashboard',
                icon: 'dashboard',
                routes: [
                    {
                        path: '/dashboard',
                        redirect: '/dashboard/analysis',
                    },
                    {
                        name: 'analysis',
                        icon: 'smile',
                        path: '/dashboard/analysis',
                        component: './dashboard/analysis',
                    },
                    {
                        name: 'monitor',
                        icon: 'smile',
                        path: '/dashboard/monitor',
                        component: './dashboard/monitor',
                    },
                    {
                        name: 'workplace',
                        icon: 'smile',
                        path: '/dashboard/workplace',
                        component: './dashboard/workplace',
                    },
                ],
            },
            {
                path: '/form',
                icon: 'form',
                name: 'form',
                routes: [
                    {
                        path: '/form',
                        redirect: '/form/basic-form',
                    },
                    {
                        name: 'basic-form',
                        icon: 'smile',
                        path: '/form/basic-form',
                        component: './form/basic-form',
                    },
                    {
                        name: 'step-form',
                        icon: 'smile',
                        path: '/form/step-form',
                        component: './form/step-form',
                    },
                    {
                        name: 'advanced-form',
                        icon: 'smile',
                        path: '/form/advanced-form',
                        component: './form/advanced-form',
                    },
                ],
            },
            {
                path: '/list',
                icon: 'table',
                name: 'list',
                routes: [
                    {
                        path: '/list/search',
                        name: 'search-list',
                        component: './list/search',
                        routes: [
                            {
                                path: '/list/search',
                                redirect: '/list/search/articles',
                            },
                            {
                                name: 'articles',
                                icon: 'smile',
                                path: '/list/search/articles',
                                component: './list/search/articles',
                            },
                            {
                                name: 'projects',
                                icon: 'smile',
                                path: '/list/search/projects',
                                component: './list/search/projects',
                            },
                            {
                                name: 'applications',
                                icon: 'smile',
                                path: '/list/search/applications',
                                component: './list/search/applications',
                            },
                        ],
                    },
                    {
                        path: '/list',
                        redirect: '/list/table-list',
                    },
                    {
                        name: 'table-list',
                        icon: 'smile',
                        path: '/list/table-list',
                        component: './list/table-list',
                    },
                    {
                        name: 'basic-list',
                        icon: 'smile',
                        path: '/list/basic-list',
                        component: './list/basic-list',
                    },
                    {
                        name: 'card-list',
                        icon: 'smile',
                        path: '/list/card-list',
                        component: './list/card-list',
                    },
                ],
            },
            {
                path: '/profile',
                name: 'profile',
                icon: 'profile',
                routes: [
                    {
                        path: '/profile',
                        redirect: '/profile/basic',
                    },
                    {
                        name: 'basic',
                        icon: 'smile',
                        path: '/profile/basic',
                        component: './profile/basic',
                    },
                    {
                        name: 'advanced',
                        icon: 'smile',
                        path: '/profile/advanced',
                        component: './profile/advanced',
                    },
                ],
            },
            {
                name: 'result',
                icon: 'CheckCircleOutlined',
                path: '/result',
                routes: [
                    {
                        path: '/result',
                        redirect: '/result/success',
                    },
                    {
                        name: 'success',
                        icon: 'smile',
                        path: '/result/success',
                        component: './result/success',
                    },
                    {
                        name: 'fail',
                        icon: 'smile',
                        path: '/result/fail',
                        component: './result/fail',
                    },
                ],
            },
            {
                name: 'exception',
                icon: 'warning',
                path: '/exception',
                routes: [
                    {
                        path: '/exception',
                        redirect: '/exception/403',
                    },
                    {
                        name: '403',
                        icon: 'smile',
                        path: '/exception/403',
                        component: './exception/403',
                    },
                    {
                        name: '404',
                        icon: 'smile',
                        path: '/exception/404',
                        component: './exception/404',
                    },
                    {
                        name: '500',
                        icon: 'smile',
                        path: '/exception/500',
                        component: './exception/500',
                    },
                ],
            },
            {
                name: 'account',
                icon: 'user',
                path: '/account',
                routes: [
                    {
                        path: '/account',
                        redirect: '/account/center',
                    },
                    {
                        name: 'center',
                        icon: 'smile',
                        path: '/account/center',
                        component: './account/center',
                    },
                    {
                        name: 'settings',
                        icon: 'smile',
                        path: '/account/settings',
                        component: './account/settings',
                    },
                ],
            },
            {
                name: 'editor',
                icon: 'highlight',
                path: '/editor',
                routes: [
                    {
                        path: '/editor',
                        redirect: '/editor/flow',
                    },
                    {
                        name: 'flow',
                        icon: 'smile',
                        path: '/editor/flow',
                        component: './editor/flow',
                    },
                    {
                        name: 'mind',
                        icon: 'smile',
                        path: '/editor/mind',
                        component: './editor/mind',
                    },
                    {
                        name: 'koni',
                        icon: 'smile',
                        path: '/editor/koni',
                        component: './editor/koni',
                    },
                ],
            },
            {
                name: '应用管理',
                icon: 'highlight',
                path: '/application',
                routes: [
                    {
                        path: '/application',
                        redirect: '/application/list',
                    },
                    {
                        name: '应用列表',
                        icon: 'smile',
                        path: '/application/list',
                        component: './editor/flow',
                    },
                ],
            },
            {
                path: '/',
                redirect: '/dashboard/analysis',
            },
            {
                component: '404',
            },
        ],
    }
})

module.exports = router

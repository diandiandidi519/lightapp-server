/**
 * @description 通过手机号验证码登录

 */

const { getVeriCodeFromCache } = require('../../cache/users/veriCode')
const {
    loginVeriCodeIncorrectFailInfo,
    createUserDbErrorFailInfo,
    userFrozenFailInfo,
    createUserFailInfo,
    updateUserFailInfo,
    updateUserDbErrorFailInfo,
    findUserListFailInfo,
} = require('../../res-model/failInfo/index')
const { ErrorRes, SuccessRes } = require('../../res-model/index')
const {
    findOneUserService,
    createUserService,
    updateUserInfoService,
    findUserService,
    updateUserRoleService,
} = require('../../service/users')
const doCrypto = require('../../utils/cryp')
const genPassword = require('../../utils/genPassword')
const { jwtSign } = require('../../utils/jwt')

/**
 * 通过手机验证码登录
 * @param {string} phoneNumber 手机号
 * @param {string} veriCode 验证码
 */
async function loginByPhoneNumber(phoneNumber, veriCode) {
    // const veriCodeFromCache = await getVeriCodeFromCache(phoneNumber)
    // if (veriCode !== veriCodeFromCache) {
    //     // 验证码不正确
    //     return new ErrorRes(loginVeriCodeIncorrectFailInfo)
    // }

    // 先查找，找到的就返回
    const userInfo = await findOneUserService({
        phoneNumber,
    })
    if (userInfo) {
        // 用户是否冻结
        if (userInfo.isFrozen) return new ErrorRes(userFrozenFailInfo)

        // 更新最后登录时间
        try {
            await updateUserInfoService(
                {
                    latestLoginAt: new Date(),
                },
                {
                    username: userInfo.username,
                }
            )
        } catch (ex) {
            console.error('更新最后登录时间错误', ex) // 只记录错误，不是主要错误，不影响登录逻辑
        }

        // 返回登录成功信息
        return new SuccessRes({
            token: jwtSign(userInfo),
        })
    }

    // 查找不到，再创建
    let password = genPassword() // 手机号注册，生成随机的密码
    password = doCrypto(password) // 加密密码

    try {
        const newUser = await createUserService({
            // 要符合 UserModel 的属性规定

            username: phoneNumber, // 用手机号
            password,
            phoneNumber,
            nickName: `乐高${phoneNumber.slice(-4)}`, // 默认给一个昵称
            latestLoginAt: new Date(),
        })
        // 创建成功
        return new SuccessRes({
            token: jwtSign(newUser),
        })
    } catch (ex) {
        console.error('创建用户失败', ex)
        return new ErrorRes(createUserDbErrorFailInfo)
    }
}

/**
 * 通过用户名和密码登录
 * @param {string} phoneNumber 手机号
 * @param {string} veriCode 验证码
 */
async function loginByAccount(username, password) {
    // 先查找，找到的就返回
    const userInfo = await findOneUserService({
        username,
        password,
    })
    if (userInfo) {
        // 用户是否冻结
        if (userInfo.isFrozen) return new ErrorRes(userFrozenFailInfo)

        // 更新最后登录时间
        try {
            await updateUserInfoService(
                {
                    latestLoginAt: new Date(),
                },
                { username: userInfo.username }
            )
        } catch (ex) {
            console.error('更新最后登录时间错误', ex) // 只记录错误，不是主要错误，不影响登录逻辑
        }

        // 返回登录成功信息
        return new SuccessRes({
            token: jwtSign(userInfo),
        })
    }
    return new ErrorRes({
        errno: 12005,
        message: '查找不到对用的用户',
    })
}

/**
 * 创建用户
 * @param {object} data 用户数据
 */
async function createUser(data = {}) {
    const { username } = data
    if (!username) return new ErrorRes(createUserFailInfo, '用户名称不能为空')

    let result
    try {
        result = await createUserService(data)
    } catch (ex) {
        console.error('创建用户错误', ex)
        return new ErrorRes(createUserDbErrorFailInfo)
    }

    if (result == null) return new ErrorRes(createUserFailInfo)
    return new SuccessRes(result)
}

/**
 * 删除用户
 * @param {string} id id
 */
async function deleteUser(id) {
    if (!id) return new ErrorRes(updateUserFailInfo, 'id 不能为空')

    let result
    try {
        result = await updateUserInfoService(
            {
                status: 0, // 假删除，实际更新 status
            },
            {
                id,
            }
        )
    } catch (ex) {
        console.error('删除用户错误', ex)
        return new ErrorRes(updateUserDbErrorFailInfo)
    }

    if (result) return new SuccessRes() // 成功
    return new ErrorRes(updateUserFailInfo)
}

/**
 * 更新用户
 * @param {string} id id
 * @param {obj} info 更新的信息
 */
async function updateUser(id, info, roles) {
    if (!id) return new ErrorRes(updateUserFailInfo, 'id不能为空')

    let result
    try {
        result = await updateUserInfoService(info, { id })
        await updateUserRoleService(id, roles)
    } catch (ex) {
        console.error('更新用户错误', ex)
        return new ErrorRes(updateUserDbErrorFailInfo)
    }

    if (result) return new SuccessRes() // 成功
    return new ErrorRes(updateUserFailInfo)
}

/**
 * 获取用户列表
 * @param {string} workId 作品 id
 */
async function getUser({ current = 1, pageSize = 20, ...rest }) {
    const result = await findUserService(rest, {
        offset: Number(current) - 1,
        limit: Number(pageSize),
    })

    return new SuccessRes(result)
}

module.exports = {
    loginByPhoneNumber,
    loginByAccount,
    createUser,
    deleteUser,
    updateUser,
    getUser,
}

/**
 * @description 检测各个服务
 */

const axios = require('axios')
const { mailAlarm } = require('../src/alarm/index')

/**
 * 测试 API 的数据库连接
 * @param {string} url url
 */
async function checkServerDbConn(url = '') {
    if (!url) return

    try {
        const res = await axios(url)
        const { data = {}, errno } = res.data
        /**
         * 数据格式：
         {
            "errno": 0,
            "data": {
                "name": "xxx",
                "version": "1.0.1",
                "ENV": "production",
                "redisConn": true,
                "mysqlConn": true,
                "mongodbConn": true
            }
         }
         */
        const { name, version, ENV } = data
        if (errno === 0 && name && version && ENV) {
            console.log('心跳检测成功', url)
            return
        }
        // 报警
        mailAlarm(`心跳检测失败 ${url}`, res)
    } catch (ex) {
        // 报警
        mailAlarm(`心跳检测失败 ${url}`, ex)
    }
}

/**
 * 检查图片
 * @param {string} url url
 */
async function checkImg(url = '') {
    if (!url) return
    try {
        const res = await axios(url)
        const { status, headers } = res
        const contentType = headers['content-type']
        if (status === 200 && contentType.indexOf('image') === 0) {
            console.log('心跳检测成功', url)
            return
        }
        // 报警
        mailAlarm(`心跳检测失败 ${url}`, res)
    } catch (ex) {
        // 报警
        mailAlarm(`心跳检测失败 ${url}`, ex)
    }
}

/**
 * 检查各个服务
 */
async function checkAllServers() {
    console.log('心跳检测 - 开始')

    // lightapp-server
    await checkServerDbConn('http://59.110.140.36:8081/api/db-check')

    console.log('心跳检测 - 结束')
}

module.exports = checkAllServers

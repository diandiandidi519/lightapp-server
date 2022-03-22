/**
 * @description prd 配置
 */
const devConf = require('./dev')

// 修改redis连接配置
Object.assign(devConf.redisConf, {
    // 通过修改hosts文件指向本机IP地址
    host: 'docker-host',
})
// 修改mysql连接配置
Object.assign(devConf.mysqlConf, {
    host: 'docker-host',
})
// 修改mongo连接配置
Object.assign(devConf.mongodbConf, {
    host: 'docker-host',
})
module.exports = devConf

/**
 * @description prd-dev 配置
 */
const devConf = require('./dev')

// 修改redis连接配置
Object.assign(devConf.redisConf, {
    // 如果和docker实例一起编排 和docker-compose 中配置的service名字一致
    host: 'lightapp-redis',
})
// 修改mysql连接配置
Object.assign(devConf.mysqlConf, {
    host: 'lightapp-mysql',
})
// 修改mongo连接配置
Object.assign(devConf.mongodbConf, {
    host: 'lightapp-mongo',
})

module.exports = devConf

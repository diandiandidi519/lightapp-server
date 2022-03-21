/**
 * @description prd-dev 配置
 */
const devConf = require('./dev')

// // 修改redis连接配置
// Object.assign(devConf.redisConf, {
//     // 和 docker-compose 中配置的service名字一致
//     host: 'editor-redis',
// })
// // 修改mysql连接配置
// Object.assign(devConf.mysqlConf, {
//     // 和 docker-compose 中配置的service名字一致
//     host: 'editor-mysql',
// })
// // 修改mongo连接配置
// Object.assign(devConf.mongodbConf, {
//     // 和 docker-compose 中配置的service名字一致
//     host: 'editor-mongo',
// })

module.exports = devConf

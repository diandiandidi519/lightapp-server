/**
 * @description role model

 */

const seq = require('../db/seq/seq')
const { STRING, INTEGER } = require('../db/seq/types')

const Role = seq.define('role_permission', {
	role_id: {
		type: INTEGER,
		allowNull: false,
	},
	permission_id: {
		type: INTEGER,
		allowNull: false,
	}
})

module.exports = Role

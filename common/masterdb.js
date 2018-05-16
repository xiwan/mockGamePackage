'use strict'

var config = require('./config.js');
var utils = require('./utils.js');

var masterdb = {
	accounts : [{
		username: 'qm865r@163.com', password: 'aa6657', token: config.token[0]
	},{
		username: 'qp963y@163.com', password: 'aa1927', token: config.token[0]
	},{
		username: 'qa345m@163.com', password: 'aa5774', token: config.token[0]
	},{
		username: 'qb810w@163.com', password: 'aa0879', token: config.token[0]
	},{
		username: 'qt731s@163.com', password: 'aa3062', token: config.token[0]
	}]
}

console.log(utils.md5(masterdb.accounts[0].username))
console.log(utils.md5(masterdb.accounts[0].password))
console.log(utils.md5(masterdb.accounts[0].token))

module.exports = masterdb;
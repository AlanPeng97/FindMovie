var mysql = require('mysql')
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'lyw980826',
  database: 'demo'
})

module.exports = connection

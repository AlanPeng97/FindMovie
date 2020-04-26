var express = require('express')
var router = express.Router()
var connection = require('../db/sql.js')
var $sql = require('../sqlMap')
var jsonWrite = function (res, ret) {
  if (typeof ret === 'undefined') {
    res.json({
      code: '1',
      msg: 'operation failed'
    })
  } else {
    res.json(ret)
  }
}

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' })
})

router.get('/list', function (req, res, next) {
  connection.query('SELECT * FROM user', function (error, results, fields) {
    if (error) throw error
    res.json(results)
  })
})

router.post('/register', (req, res) => {
  var sqlName = $sql.user.select_name
  var sql = $sql.user.add
  var params = req.body
  console.log(params)
  connection.query(sqlName, params.username, function (err, result) {
    if (err) {
      console.log(err)
    }
    if (result[0] === undefined) {
      connection.query(sql, [params.username, params.password], function (err, result) {
        if (err) {
          console.log(err)
        }
        if (result) {
          jsonWrite(res, result)
        }
      })
    } else {
      res.send('-1')
    }
  })
})

router.post('/login', (req, res) => {
  var sqlName = $sql.user.select_name
  var sqlAccount = $sql.user.select_nameAndPassword
  var params = req.body
  console.log(params)
  connection.query(sqlName, params.username, function (err, result) {
    if (err) {
      console.log(err)
    }
    if (result[0] === undefined) {
      res.send('-1')
    } else {
      connection.query(sqlAccount, [params.username, params.password], function (err, result) {
        if (err) {
          console.log(err)
        }
        if (result[0] === undefined) {
          res.send('0')
        } else {
          jsonWrite(res, result)
        }
      })
    }
  })
})

router.post('/likelist', (req, res) => {
  var sqlList = $sql.user.select_likeList
  var params = req.body
  console.log(params)
  connection.query(sqlList, params.username, function (err, results) {
    if (err) {
      console.log(err)
    }
    if (results[0] === undefined) {
      res.send('0')
    } else {
      jsonWrite(res, results)
    }
  })
})

router.post('/addfav', (req, res) => {
  var sqllike = $sql.user.check_likeMovie
  var addlike = $sql.user.add_likedmovie
  var params = req.body
  console.log(params)
  connection.query(sqllike, params.username, function (err, result) {
    if (err) {
      console.log(err)
    }
    if (result[0] === undefined) {
      connection.query(addlike, [params.movieid, params.username], function (err, result) {
        if (err) {
          console.log(err)
        }
        if (result) {
          jsonWrite(res, result)
        }
      })
    } else {
      res.send('-1')
    }
  })
})

router.post('/addmov', (req, res) => {
  var sqlmovie = $sql.user.check_movie
  var addmovieinfo = $sql.user.add_movieinfo
  var params = req.body
  console.log(params)
  connection.query(sqlmovie, params.id, function (err, result) {
    if (err) {
      console.log(err)
    }
    if (result[0] === undefined) {
      connection.query(addmovieinfo, [params.id, params.title, params.popularity, params.overview, params.date, params.vote, params.votecount, params.geredis, params.backdrop, params.poster, params.video], function (err, result) {
        if (err) {
          console.log(err)
        }
        if (result) {
          jsonWrite(res, result)
        }
      })
    } else {
      res.send('-1')
    }
  })
})

module.exports = router

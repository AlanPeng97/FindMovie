var sqlMap = {
  user: {
    add: 'INSERT INTO user( username, password) VALUES ( ?, ?)',
    select_name: 'SELECT * FROM user WHERE username = ?',
    select_nameAndPassword: 'SELECT * FROM user WHERE username = ? AND password = ?',
    select_nameWithMovie: 'SELECT * FROM liked WHERE username = ?',
    select_likeMovie: 'SELECT * FROM liked,movieinfo WHERE liked.username = ? AND liked.movieid = movieinfo.id',
    select_likeList: 'SELECT * FROM liked WHERE username = ?',
    check_likeMovie: 'SELECT * FROM liked WHERE movieid = ? AND username = ?',
    check_movie: 'SELECT * FROM movieinfo WHERE id = ?',
    add_likedmovie: 'INSERT INTO liked(movieid, username) VALUES (?, ?)',
    delete_likedmovie: 'DELETE FROM liked WHERE movieid = ?',
    add_movieinfo: 'INSERT INTO movieinfo(id, title, popularity, overview, date, vote, votecount, genredis, backdrop, poster, video) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
  }
}

module.exports = sqlMap

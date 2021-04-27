const db = require('../database');

const ratings = {
  getByGame: function(id, callback) {
    return db.query('select * from ratings where idgames=?', [id], callback);
  },
  getAll: function(callback) {
    return db.query('select * from ratings', callback);
  },
  add: function(ratings, callback) {
    return db.query(
      'insert into ratings (idplayers, idgames, rating) values(?,?,?)',
      [ratings.idplayers, ratings.idgames, ratings.rating],
      callback
    );
  },
  update: function(id, ratings, callback) {
    return db.query(
      'update ratings set idplayer=?,idgames=?,rating=? where idratings=?',
      [ratings.idplayers, ratings.idgames, ratings.rating, id],
      callback
    );
  }
};
module.exports = ratings;
const db = require('../database');

const scores = {
  getByGame: function(id, callback) {
    return db.query('select * from scores where idgames=?', [id], callback);
  },
  getAll: function(callback) {
    return db.query('select * from scores', callback);
  },
  add: function(scores, callback) {
    return db.query(
      'insert into scores (idplayers, idgames, score, timestamp) values(?,?,?,?)',
      [scores.idplayers, scores.idgames, scores.score, scores.timestamp],
      callback
    );
  },
  update: function(id, scores, callback) {
    return db.query(
      'update scores set idplayer=?,idgames=?,score=?,timestamp=? where idratings=?',
      [scores.idplayers, scores.idgames, scores.score, scores.timestamp, id],
      callback
    );
  }
};
module.exports = scores;
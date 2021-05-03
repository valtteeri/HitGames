const db = require('../database');

const games = {
  getById: function(id, callback) {
    return db.query('select * from games where idgames=?', [id], callback);
  },
  getAll: function(callback) {
    return db.query('select * from games', callback);
  },
  update: function(id, games, callback) {
    return db.query(
      'update games set game=?,popularity=? where idgames=?',
      [games.game, games.popularity, id],
      callback
    );
  }
};
module.exports = games;
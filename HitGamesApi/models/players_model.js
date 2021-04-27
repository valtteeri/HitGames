const db = require('../database');

const players = {
  getById: function(id, callback) {
    return db.query('select * from players where idplayers=?', [id], callback);
  },
  getAll: function(callback) {
    return db.query('select * from players', callback);
  },
  add: function(players, callback) {
    return db.query(
      'insert into players (playername) values(?)',
      [players.playername],
      callback
    );
  },
  update: function(id, players, callback) {
    return db.query(
      'update players set playername=? where idplayers=?',
      [players.playername, id],
      callback
    );
  }
};
module.exports = players;
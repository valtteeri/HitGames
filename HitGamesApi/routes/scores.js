const express = require('express');
const router = express.Router();
const scores = require('../models/scores_model');

router.get('/:id?',
 function(request, response) {
  if (request.params.id) {
    scores.getByGame(request.params.id, function(err, dbResult) {
      if (err) {
        response.json(err);
      } else {
        response.json(dbResult);
      }
    });
  } else {
    scores.getAll(function(err, dbResult) {
      if (err) {
        response.json(err);
      } else {
        response.json(dbResult);
      }
    });
  }
});

router.post('/', 
function(request, response) {
  scores.add(request.body, function(err, dbResult) {
    if (err) {
      response.json(err);
    } else {
      response.json(request.body);
    }
  });
});

router.put('/:id', 
function(request, response) {
  scores.update(request.params.id, request.body, function(err, dbResult) {
    if (err) {
      response.json(err);
    } else {
      response.json(dbResult);
    }
  });
});

module.exports = router;
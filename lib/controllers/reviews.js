const { Router } = require('express');
const authenticate = require('../middleware/authenticate.js');
const authorize = require('../middleware/authorize.js');
const { Review } = require('../models/Review.js');

module.exports = Router()
  .get('/:id', async (req, res, next) => {
    try {
      const reviews = await Review.getById(req.params.id);
      if (!reviews) {
        res.status(404);
        res.send();
      }
      res.json(reviews);
    } catch (e) {
      next(e);
    }
  })
  .delete('/:id', authenticate, async (req, res, next) => {
    try {
      const reviews = await Review.delete(req.params.id);
      res.json(reviews);
    } catch (e) {
      next(e);
    }
  });

// added secrets in GitHub to pass CI

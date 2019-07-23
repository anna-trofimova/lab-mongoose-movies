'use strict';
const express = require('express');
const router = express.Router();
const { isFormFilled, isObjectId } = require('../middlewares/authMiddlewares');

const Celebrity = require('../models/Celebrity.js');

// /* GET . */
router.get('/', async (req, res, next) => {
  try {
    const celebrityList = await Celebrity.find();
    res.render('celebritiesViews/index', { celebrityList });
  } catch (error) {
    next(error);
  }
});
router.get('/new', (req, res, next) => {
  res.render('celebritiesViews/new');
});

router.post('/new', isFormFilled, async (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body;

  try {
    await Celebrity.create({
      name,
      occupation,
      catchPhrase
    });
    // console.log(celebrityDetails);
    res.redirect('/celebrities');
  } catch (error) {
    next(error);
  }
});

router.get('/:id/', isObjectId, async (req, res, next) => {
  const { id } = req.params;
  try {
    const celebrityDetails = await Celebrity.findById(id);
    res.render('celebritiesViews/show', celebrityDetails);
  } catch (error) {
    next(error);
  }
});

router.get('/:id/edit', isObjectId, async (req, res, next) => {
  const { id } = req.params;
  try {
    const celebrityDetails = await Celebrity.findById(id);
    res.render('celebritiesViews/edit', celebrityDetails);
  } catch (error) {
    next(error);
  }
});
router.post('/:id/edit', isFormFilled, isObjectId, async (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body;
  const { id } = req.params;
  console.log(req.body);
  try {
    await Celebrity.findOneAndUpdate(id, {
      name,
      occupation,
      catchPhrase
    });
    res.redirect('/celebrities');
  } catch (error) {
    next(error);
  }
});

router.post('/:id/delete', isObjectId, async (req, res, next) => {
  const { id } = req.params;
  try {
    await Celebrity.findByIdAndRemove(id);
    res.redirect('/celebrities');
  } catch (error) {
    next(error);
  }
});

module.exports = router;

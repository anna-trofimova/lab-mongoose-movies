'use strict';

const mongoose = require('mongoose');

const isFormFilled = (req, res, next) => {
  const { name, catchPhrase } = req.body;
  if (!name || !catchPhrase) {
    return res.redirect(req.path);
  }
  next();
};

const isObjectId = (req, res, next) => {
  const { id } = req.params;
  if (mongoose.Types.ObjectId.isValid(id)) {
    next();
  } else {
    return res.redirect(req.path);
  }
};

module.exports = {
  isFormFilled,
  isObjectId
};

'use strict';
const mongoose = require('mongoose');
const Celebrity = require('../models/Celebrity');
// mongooose.connection()

mongoose.connect('mongodb://localhost/celebrities', {
  keepAlive: true,
  useNewUrlParser: true,
  reconnectTries: Number.MAX_VALUE
});

const celebrities = [
  {
    name: 'Rihanna',
    occupation: 'singer',
    catchPhrase: 'I am happy and I\'m single.'
  },
  {
    name: 'Shia Lebeouf',
    occupation: 'actor',
    catchPhrase: 'Just do it!'
  },
  {
    name: 'Donald Trump',
    occupation: 'politician',
    catchPhrase: 'Make America great again'
  }
];

const addCelebrities = async () => {
  try {
    await Celebrity.create(celebrities);
    mongoose.connection.close();
  } catch (error) {
    console.log(error);
  }
};

addCelebrities();

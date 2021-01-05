const express = require('express');
const router = express.Router();

const Country = require('../../models/Country');

// @route GET /api/countries
// @desc Get all countries
// @public
router.get('/', (req, res) => {
  Country.find().then(countries => res.json(countries));
});

// @route POST /api/countries
// @desc Post new countries
// @public
router.post('/', (req, res) => {
  const newCountry = new Country({ name: req.body.name });

  newCountry
    .save()
    .then(country => res.status(201).json({ success: true, data: country }))
    .catch(err => res.status(400).json({ success: false, error: err.message }));
});

module.exports = router;

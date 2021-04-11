const express = require('express');
const router = express.Router();

const Country = require('../../models/Country').Country;

// @route GET /api/countries
// @desc Get all countries
// @public
router.get('/', (req, res) => {
  Country.find()
    .then(countries => res.json({ success: true, data: countries }))
    .catch(err => res.status(400).json({ success: false, error: err.message }));
});

// @route POST /api/countries
// @desc Post new country
// @public
router.post('/', (req, res) => {
  Country.find({ name: req.body.name }).then(result => {
    const countryExists = result.length > 0;
    if (countryExists) return res.json({ success: false, error: 'Ten kraj jest już na liście.' });
    if (!req.body.name)
      return res.json({ success: false, error: 'Brak nazwy państwa, spróbuj ponownie.' });

    const newCountry = new Country({ name: req.body.name });
    newCountry
      .save()
      .then(country => res.status(201).json({ success: true, data: country }))
      .catch(err => res.status(400).json({ success: false, error: err.message }));
  });
});

module.exports = router;

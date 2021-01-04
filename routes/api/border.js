const express = require('express');
const router = express.Router();

const Border = require('../../models/Border');

// @route GET /api/borders
// @desc Get all border crossings
// @public
router.get('/', (req, res) => {
  Border.find()
    .sort({ timestamp: 1 })
    .then(borders => res.json(borders));
});

// @route GET /api/borders/:id
// @desc Get one border crossing
// @public
router.get('/:id', (req, res) => {
  Border.findById(req.params.id)
    .then(border => res.json(border))
    .catch(err => res.status(404).json({ success: false, error: err.message }));
});

// @route POST /api/borders
// @desc Post new border crossing
// @public
router.post('/', (req, res) => {
  const newBorder = new Border({
    from: req.body.from,
    to: req.body.to,
    time: req.body.time,
    date: req.body.date,
    timestamp: req.body.timestamp,
  });

  newBorder
    .save()
    .then(border => res.status(201).json({ success: true, data: border }))
    .catch(err => res.status(400).json({ success: false, error: err.message }));
});

// @route PUT /api/borders/:id
// @desc Update border crossing
// @public
router.put('/:id', (req, res) => {
  Border.findByIdAndUpdate(
    req.params.id,
    { ...req.body },
    { new: true }
  ).then(updatedBorder => res.json(updatedBorder));
});

// @route DELETE /api/borders/:id
// @desc Delete border crossing
// @public
router.delete('/:id', (req, res) => {
  Border.findByIdAndDelete(req.params.id).then(border => res.json(border));
});

module.exports = router;

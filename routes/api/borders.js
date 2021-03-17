const express = require('express');
const router = express.Router();

const Border = require('../../models/Border').Border;

// @route GET /api/borders
// @desc Get all border crossings
// @public
router.get('/', (req, res) => {
  Border.find()
    .sort({ timestamp: 1 })
    .then(borders => res.json({ success: true, data: borders }))
    .catch(err => res.status(400).json({ success: false, error: err.message }));
});

// @route GET /api/borders/:id
// @desc Get one border crossing
// @public
router.get('/:id', (req, res) => {
  Border.findById(req.params.id)
    .then(border => {
      if (border) return res.json({ success: true, data: border });
      else
        return res.json({
          success: false,
          error:
            'Przekroczenie granicy z podanym ID nie istnieje w bazie danych',
        });
    })
    .catch(err => res.status(400).json({ success: false, error: err.message }));
});

// @route POST /api/borders
// @desc Post new border crossing
// @public
router.post('/', (req, res) => {
  const newBorder = new Border({
    type: req.body.type,
    from: req.body.from,
    to: req.body.to,
    time: req.body.time,
    date: req.body.date,
    timestamp: req.body.timestamp,
    user: req.body.user,
  });

  newBorder
    .save()
    .then(border => res.status(200).json({ success: true, data: border }))
    .catch(err => res.status(400).json({ success: false, error: err.message }));
});

// @route PUT /api/borders/:id
// @desc Update border crossing
// @public
router.put('/:id', (req, res) => {
  Border.findByIdAndUpdate(req.params.id, { ...req.body }, { new: true })
    .then(updatedBorder => {
      if (updatedBorder)
        return res.json({ success: true, data: updatedBorder });
      else
        return res.json({
          success: false,
          error:
            'Przekroczenie granicy z podanym ID nie istnieje w bazie danych',
        });
    })
    .catch(err => res.status(400).json({ success: false, error: err.message }));
});

// @route DELETE /api/borders/undo
// @desc Remove the most recent border crossing
// @public
router.delete('/undo', (req, res) => {
  Border.findOne()
    .sort({ _id: -1 })
    .then(latest => {
      if (latest) {
        Border.deleteOne(latest).then(() =>
          res.json({ success: true, data: latest })
        );
      } else
        return res.json({
          success: false,
          error: 'Brak elementu do usunięcia',
        });
    })
    .catch(err => res.status(400).json({ success: false, error: err.message }));
});

// @route DELETE /api/borders/clear
// @desc Delete all border crossings
// @public
router.delete('/clear', (req, res) => {
  Border.deleteMany({})
    .then(() => res.json({ success: true, data: [] }))
    .catch(err => res.status(400).json({ success: false, error: err.message }));
});

// @route DELETE /api/borders/:id
// @desc Delete border crossing
// @public
router.delete('/:id', (req, res) => {
  Border.findByIdAndDelete(req.params.id)
    .then(border => {
      if (border) return res.json({ success: true, data: border });
      else
        return res.json({
          success: false,
          error:
            'Przekroczenie granicy z podanym ID nie istnieje w bazie danych',
        });
    })
    .catch(err => res.status(400).json({ success: false, error: err.message }));
});

module.exports = router;

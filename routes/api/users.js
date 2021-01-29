const express = require('express');
const router = express.Router();

const User = require('../../models/User');
const auth = require('../../middlewares/auth');
const validateTimeAndDate = require('../../middlewares/validateTimeAndDate');

// @route POST /api/users/:id/borders
// @desc Post new border crossing to user's borders array
// @private
router.post('/:userId/borders', auth, (req, res) => {
  User.findById(req.user.id)
    .select('-password -__v')
    .then(user => {
      user.borders.push(req.body);
      user.save();
      return res.json({ success: true, data: user });
    })
    .catch(err => res.status(400).json({ success: false, error: err.message }));
});

// @route DELETE /api/users/:id/borders/undo
// @desc Delete last border crossing from user's borders array
// @private
router.delete('/:userId/borders/undo', auth, (req, res) => {
  User.findById(req.user.id)
    .select('-password -__v')
    .then(user => {
      user.borders.$pop();
      user.save();
      return res.json({ success: true, data: user });
    })
    .catch(err => res.status(400).json({ success: false, error: err.message }));
});

// @route DELETE /api/users/:id/borders
// @desc Delete all border crossings from user's borders array
// @private
router.delete('/:userId/borders', auth, (req, res) => {
  User.findById(req.user.id)
    .select('-password -__v')
    .then(user => {
      user.borders = [];
      user.save();
      return res.json({ success: true, data: user });
    })
    .catch(err => res.status(400).json({ success: false, error: err.message }));
});

// @route PUT /api/users/:userId/borders/:borderId
// @desc Post new border crossing to user's borders array
// @private
router.put(
  '/:userId/borders/:borderId',
  [auth, validateTimeAndDate],
  (req, res) => {
    User.findById(req.user.id)
      .select('-password -__v')
      .then(user => {
        const borderToUpdate = user.borders.id(req.params.borderId);
        borderToUpdate.set(req.body);
        user.save();
        return res.json({ success: true, data: user });
      })
      .catch(err =>
        res.status(400).json({ success: false, error: err.message })
      );
  }
);

// @route POST /api/users/:id/countries
// @desc Add new country to user's countries array
// @private
router.post('/:userId/countries', auth, (req, res) => {
  User.findById(req.user.id)
    .select('-password -__v')
    .then(user => {
      const countryExists = user.countries.find(
        el => el.name === req.body.name
      );
      if (countryExists) {
        return res.json({
          success: false,
          error: 'Ten kraj jest już na liście.',
        });
      }
      user.countries.push(req.body);
      user.save();
      return res.json({ success: true, data: user });
    })
    .catch(err => res.status(400).json({ success: false, error: err.message }));
});

module.exports = router;

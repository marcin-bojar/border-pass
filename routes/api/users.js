const express = require('express');
const router = express.Router();

const User = require('../../models/User');

// @route POST /api/users/:id/borders
// @desc Post new border crossing to user's borders array
// @public
router.post('/:id/borders', (req, res) => {
  User.findById(req.params.id)
    .then(user => {
      user.borders.push(req.body);
      user.save();
      return res.json({ success: true, data: user });
    })
    .catch(err => res.status(400).json({ success: false, error: err.message }));
});

module.exports = router;

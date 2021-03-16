const express = require('express');
const router = express.Router();

const auth = require('../../middlewares/auth');

const Table = require('../../models/Table');

// @route POST /api/tables/
// @desc Post new table
// @private
router.post('/', auth, (req, res) => {
  try {
    const table = new Table({
      user: req.user.id,
      status: 'archived',
      html: req.markup,
    });
    table.save();
  } catch {
    return res.status(400).json({
      success: false,
      error: 'Nie udało się zarchiwizować danych, spróbuj ponownie',
    });
  }
  return res.json({ success: true, data: null });
});

module.exports = router;

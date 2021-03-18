const express = require('express');
const router = express.Router();

const auth = require('../../middlewares/auth');
const createBordersFile = require('../../middlewares/createBordersFile');

const Table = require('../../models/Table');

// @route POST /api/tables/
// @desc Post new table
// @private
router.post('/', [auth, createBordersFile], (req, res) => {
  const table = new Table({
    user: req.user.id,
    status: 'archived',
    html: req.markup,
  });
  table
    .save()
    .then(savedTable => {
      return res.json({ success: true, data: savedTable });
    })
    .catch(err =>
      res.status(500).json({
        success: false,
        error: err,
      })
    );
});

module.exports = router;

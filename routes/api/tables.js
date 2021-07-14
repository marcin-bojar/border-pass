const express = require('express');
const router = express.Router();

const auth = require('../../middlewares/auth');
const createBordersFile = require('../../middlewares/createBordersFile');

const Table = require('../../models/Table');

router.use(auth);

// @route POST /api/tables/
// @desc Post new table
// @private
router.post('/', createBordersFile, async (req, res) => {
  try {
    const table = new Table({
      _user: req.user.id,
      status: 'archived',
      html: req.markup,
      borders: req.body.borders,
    });
    const savedTable = await table.save();
    return res.json({ success: true, data: savedTable });
  } catch {
    return res.status(500).json({
      success: false,
      error: 'Archiwizacja nieudana, spróbuj ponownie.',
    });
  }
});

// @route GET /api/tables/
// @desc Get user's table
// @private
router.get('/', async (req, res) => {
  try {
    const { user } = req;
    const userTables = await Table.find({ _user: user.id }).select('-createdAt -__v -html');
    return res.json({ success: true, data: userTables });
  } catch {
    return res.status(500).json({
      success: false,
      error: 'Nie udało się pobrać danych, spróbuj ponownie.',
    });
  }
});

// @route DELETE /api/tables/:tableId
// @desc Delete user's table
// @private
router.delete('/:tableId', async (req, res) => {
  try {
    const { user } = req;
    const { tableId } = req.params;
    const table = await Table.findOne({ _id: tableId, _user: user.id });

    if (table) {
      await Table.deleteOne(table);
      return res.json({ success: true, data: table });
    } else
      return res.status(404).json({
        success: false,
        error: 'Tej tablicy nie ma w Twoim archiwum.',
      });
  } catch {
    return res
      .status(500)
      .json({ success: false, error: 'Nie udało się usunąć tablicy, spróbuj ponownie.' });
  }
});

module.exports = router;

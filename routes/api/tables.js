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
    borders: req.body.borders,
  });
  table
    .save()
    .then(savedTable => {
      return res.json({ success: true, data: savedTable });
    })
    .catch(() =>
      res.status(500).json({
        success: false,
        error: 'Archiwizacja nieudana, spróbuj ponownie.',
      })
    );
});

// @route GET /api/tables/
// @desc Post new table
// @private
router.get('/', auth, (req, res) => {
  const { user } = req;

  Table.find({ user: user.id })
    .select('-createdAt -__v -html')
    .then(tables => res.json({ success: true, data: tables }))
    .catch(() =>
      res.status(400).json({
        success: false,
        error: 'Nie udało się pobrać danych, spróbuj ponownie.',
      })
    );
});

// @route DELETE /api/tables/:tableId
// @desc Delete user's table
// @private
router.delete('/:tableId', auth, (req, res) => {
  const { user } = req;
  const { tableId } = req.params;

  Table.findOne({ _id: tableId, user: user.id })
    .then(table => {
      if (table) {
        Table.deleteOne(table)
          .then(() => res.json({ success: true, data: table }))
          .catch(() =>
            res
              .status(400)
              .json({ success: false, error: 'Nie udało się usunąć tablicy, spróbuj ponownie.' })
          );
      } else
        res.status(404).json({
          success: false,
          error: 'Ta tablica nie istnieje w archiwum dla danego użytkownika.',
        });
    })
    .catch(() =>
      res.status(500).json({
        success: false,
        error: 'Coś poszło nie tak, spróbuj ponownie.',
      })
    );
});

module.exports = router;

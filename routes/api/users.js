const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const nodemailerConfig = require('../../helpers/nodemailer.js');

const User = require('../../models/User');
const Table = require('../../models/Table');

const auth = require('../../middlewares/auth');
const validateTimeAndDate = require('../../middlewares/validateTimeAndDate');
const createBordersFile = require('../../middlewares/createBordersFile');

// @route POST /api/users/:userId/borders
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
    .catch(() =>
      res.status(400).json({
        success: false,
        error: 'Nie udało się dodać wpisu, spróbuj ponownie.',
      })
    );
});

// @route DELETE /api/users/:userId/borders/undo
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
    .catch(() =>
      res.status(400).json({
        success: false,
        error: 'Nie udało sie usunąć ostatniego wpisu, spróbuj ponownie.',
      })
    );
});

// @route PUT /api/users/:userId/borders
// @desc Update user's borders array
// @private
router.put('/:userId/borders', auth, (req, res) => {
  User.findById(req.user.id)
    .select('-password -__v')
    .then(user => {
      user.borders = req.body;
      user.save();
      return res.json({ success: true, data: user });
    })
    .catch(() =>
      res.status(400).json({
        success: false,
        error: 'Aktualizacja nie powiodła się, spróbuj ponownie.',
      })
    );
});

// @route DELETE /api/users/:userId/borders
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
    .catch(() =>
      res.status(400).json({
        success: false,
        error: 'Nie udało się usunąć danych, spróbuj ponownie.',
      })
    );
});

// @route PUT /api/users/:userId/borders/:borderId
// @desc Update border crossing in user's borders array
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
      .catch(() =>
        res.status(400).json({
          success: false,
          error: 'Aktualizacja nie powiodła się, spróbuj ponownie.',
        })
      );
  }
);

// @route POST /api/users/:userId/countries
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
    .catch(() =>
      res.status(400).json({
        success: false,
        error: 'Nie udało dodać się kraju, spróbuj ponownie.',
      })
    );
});

// @route POST /api/users/:userId/send
// @desc Send an email with user's borders' table
// @private
router.post('/:userId/send', [auth, createBordersFile], (req, res) => {
  const pathToFile = path.join(
    path.dirname(require.main.filename),
    'temp',
    req.filename
  );

  fs.access(pathToFile, err => {
    if (err)
      return res.status(404).json({
        success: false,
        error: 'Brak danych do wysłania, spróbuj ponownie',
      });

    User.findById(req.user.id)
      .select('name')
      .then(user => {
        const { transporter, createMailData } = nodemailerConfig;

        const mailData = createMailData(req.body.email, user.name, pathToFile);

        transporter.sendMail(mailData, (err, info) => {
          if (err)
            return res.status(500).json({
              success: false,
              error: 'Nie udało wysłać się zestawienia, spróbuj ponownie.',
            });

          const table = new Table({
            user: req.user.id,
            status: 'sent',
            html: req.markup,
          });
          table.save();

          return res.json({ success: true, data: info });
        });
      });
  });
});

// @route POST /api/users/:userId/company
// @desc Set user's compnay details
// @private
router.post('/:userId/company', auth, (req, res) => {
  User.findById(req.user.id)
    .then(user => {
      user.company = req.body;
      user.save();
      return res.json({ success: true, data: user });
    })
    .catch(() =>
      res.status(400).json({
        success: false,
        error: 'Nie udało się zapisać ustawień, spróbuj ponownie.',
      })
    );
});

module.exports = router;

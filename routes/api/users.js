const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const nodemailerConfig = require('../../helpers/nodemailer.js');

const User = require('../../models/User');
const Table = require('../../models/Table');
const ArchivedTripEvent = require('../../models/ArchivedTripEvent');

const auth = require('../../middlewares/auth');
const validateTimeAndDate = require('../../middlewares/validateTimeAndDate');
const createBordersFile = require('../../middlewares/createBordersFile');
const validateEmail = require('../../middlewares/validateEmail.js');

// @route POST /api/users/:userId/borders
// @desc Post new border crossing to user's borders array
// @private
router.post('/:userId/borders', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password -__v');
    const { type, from, to, time, date, timestamp } = req.body;

    user.borders.push(req.body);
    await user.save();

    const newArchivedTripEvent = new ArchivedTripEvent({
      type,
      from,
      to,
      time,
      date,
      timestamp,
      _user: req.user.id,
    });
    await newArchivedTripEvent.save();
    return res.json({ success: true, data: user });
  } catch {
    return res.status(500).json({
      success: false,
      error: 'Nie udało się dodać wpisu, spróbuj ponownie.',
    });
  }
});

// @route DELETE /api/users/:userId/borders/undo
// @desc Delete last border crossing from user's borders array
// @private
router.delete('/:userId/borders/undo', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password -__v');
    user.borders.id(req.body.lastItemId).remove();
    await user.save();
    return res.json({ success: true, data: user });
  } catch {
    return res.status(500).json({
      success: false,
      error: 'Nie udało sie usunąć ostatniego wpisu, spróbuj ponownie.',
    });
  }
});

// @route PUT /api/users/:userId/borders
// @desc Update user's borders array
// @private
router.put('/:userId/borders', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password -__v');
    user.borders = req.body;
    await user.save();
    return res.json({ success: true, data: user });
  } catch {
    return res.status(400).json({
      success: false,
      error: 'Aktualizacja nie powiodła się, spróbuj ponownie.',
    });
  }
});

// @route DELETE /api/users/:userId/borders
// @desc Delete all border crossings from user's borders array
// @private
router.delete('/:userId/borders', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password -__v');
    user.borders = [];
    await user.save();
    return res.json({ success: true, data: user });
  } catch {
    return res.status(500).json({
      success: false,
      error: 'Nie udało się usunąć danych, spróbuj ponownie.',
    });
  }
});

// @route PUT /api/users/:userId/borders/:borderId
// @desc Update border crossing in user's borders array
// @private
router.put('/:userId/borders/:borderId', [auth, validateTimeAndDate], async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password -__v');
    const borderToUpdate = user.borders.id(req.params.borderId);
    borderToUpdate.set(req.body);
    await user.save();
    return res.json({ success: true, data: user });
  } catch {
    return res.status(500).json({
      success: false,
      error: 'Aktualizacja nie powiodła się, spróbuj ponownie.',
    });
  }
});

// @route POST /api/users/:userId/countries
// @desc Add new country to user's countries array
// @private
router.post('/:userId/countries', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password -__v');
    const countryExists = user.countries.find(el => el.name === req.body.name);
    if (countryExists) {
      return res.json({
        success: false,
        error: 'Ten kraj jest już na liście.',
      });
    }
    user.countries.push(req.body);
    await user.save();
    return res.json({ success: true, data: user });
  } catch {
    return res.status(500).json({
      success: false,
      error: 'Nie udało dodać się kraju, spróbuj ponownie.',
    });
  }
});

// @route POST /api/users/:userId/send
// @desc Send an email with user's borders' table
// @private
router.post('/:userId/send', [auth, createBordersFile], (req, res) => {
  try {
    const pathToFile = path.join(path.dirname(require.main.filename), 'temp', req.filename);
    fs.access(pathToFile, async err => {
      if (err)
        return res.status(404).json({
          success: false,
          error: 'Brak danych do wysłania, spróbuj ponownie',
        });

      const user = await User.findById(req.user.id).select('name');
      const { transporter, createMailData } = nodemailerConfig;
      const mailData = createMailData(req.body.email, user.name, pathToFile);
      transporter.sendMail(mailData, async (err, info) => {
        if (err)
          return res.status(500).json({
            success: false,
            error: 'Nie udało wysłać się zestawienia, spróbuj ponownie.',
          });

        const table = new Table({
          user: req.user.id,
          status: 'sent',
          html: req.markup,
          borders: req.body.borders,
        });
        await table.save();
        return res.json({ success: true, data: info });
      });
    });
  } catch {
    return res.status(500).json({
      success: false,
      error: 'Coś poszło nie tak, spróbuj ponownie.',
    });
  }
});

// @route POST /api/users/:userId/company
// @desc Set user's company details
// @private
router.post('/:userId/company', [auth, validateEmail], async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password -__v');
    user.company = req.body;
    await user.save();
    return res.json({ success: true, data: user });
  } catch {
    return res.status(500).json({
      success: false,
      error: 'Nie udało się zapisać danych firmy, spróbuj ponownie.',
    });
  }
});

// @route POST /api/users/:userId/name
// @desc Set user's name
// @private
router.post('/:userId/name', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password -__v');
    user.name = req.body.userName;
    await user.save();
    return res.json({ success: true, data: user });
  } catch {
    return res.status(500).json({
      success: false,
      error: 'Nie udało się zapisać Twoich danych, spróbuj ponownie.',
    });
  }
});

module.exports = router;

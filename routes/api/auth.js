const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('../../models/User');

const signupValidation = require('../../middlewares/signupValidation');
const hashPassword = require('../../middlewares/hashPassword');
const auth = require('../../middlewares/auth');
const validateEmail = require('../../middlewares/validateEmail');

// @route POST /api/auth/signup
// @desc Register new user
// @public
router.post(
  '/signup',
  [
    signupValidation.checkIfAllFieldsAreFilledIn,
    signupValidation.checkIfUserAlreadyExists,
    validateEmail,
    signupValidation.validatePassword,
    hashPassword,
  ],
  async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const newUser = new User({
        name,
        email: email.toLowerCase().trim(),
        password,
      });

      const user = await newUser.save();
      jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '6d' }, (err, token) => {
        if (err) throw err;

        return res.json({
          success: true,
          data: {
            token,
            user: {
              _id: user.id,
              name: user.name,
              email: user.email,
              borders: user.borders,
              countries: user.countries,
              places: user.places,
              company: user.company,
              preferences: user.preferences,
              registeredAt: user.registeredAt,
            },
          },
        });
      });
    } catch {
      return res
        .status(500)
        .json({ success: false, error: 'Coś poszło nie tak, spróbuj ponownie.' });
    }
  }
);

// @route POST /api/auth/signin
// @desc Sign in user
// @public
router.post('/signin', validateEmail, async (req, res) => {
  const { password } = req.body;
  const email = req.body.email.toLowerCase().trim();

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ success: false, error: 'Podany użytkownik nie istnieje.' });

    bcrypt.compare(password, user.password).then(isValidPassword => {
      if (!isValidPassword)
        return res.status(401).json({
          success: false,
          error: 'Podane dane logowania są błędne.',
        });

      jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '6d' }, (err, token) => {
        if (err) throw err;

        return res.json({
          success: true,
          data: {
            token,
            user: {
              _id: user.id,
              name: user.name,
              email: user.email,
              borders: user.borders,
              countries: user.countries,
              places: user.places,
              company: user.company,
              preferences: user.preferences,
              registeredAt: user.registeredAt,
            },
          },
        });
      });
    });
  } catch {
    return res.status(500).json({ success: false, error: 'Coś poszło nie tak, spróbuj ponownie.' });
  }
});

// @route GET /api/auth/user
// @desc Authenticate user with token
// @privat
router.get('/user', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password -__v');
    return res.json({ success: true, data: user });
  } catch {
    return res
      .status(500)
      .json({ success: false, error: 'Nie udało się pobrać danych użytkownika.' });
  }
});

module.exports = router;

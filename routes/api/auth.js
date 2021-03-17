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
  (req, res) => {
    const { name, email, password } = req.body;

    const newUser = new User({
      name,
      email: email.toLowerCase().trim(),
      password,
    });

    newUser
      .save()
      .then(user => {
        jwt.sign(
          { id: user.id },
          process.env.JWT_SECRET,
          { expiresIn: '6d' },
          (err, token) => {
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
                  company: user.company,
                  registeredAt: user.registeredAt,
                },
              },
            });
          }
        );
      })
      .catch(err => res.json({ success: false, error: err.message }));
  }
);

// @route POST /api/auth/signin
// @desc Sign in user
// @public
router.post('/signin', validateEmail, (req, res) => {
  const { password } = req.body;
  const email = req.body.email.toLowerCase().trim();

  User.findOne({ email })
    .then(user => {
      if (!user)
        return res
          .status(404)
          .json({ success: false, error: 'Brak użytkownika' });

      bcrypt
        .compare(password, user.password)
        .then(isValidPassword => {
          if (!isValidPassword)
            return res.status(401).json({
              success: false,
              error: 'Podane dane logowania są błędne.',
            });

          jwt.sign(
            { id: user.id },
            process.env.JWT_SECRET,
            { expiresIn: '6d' },
            (err, token) => {
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
                    company: user.company,
                    registeredAt: user.registeredAt,
                  },
                },
              });
            }
          );
        })
        .catch(err =>
          res.status(400).json({ success: false, error: err.message })
        );
    })
    .catch(err => res.status(400).json({ success: false, error: err.message }));
});

// @route GET /api/auth/user
// @desc Authenticate user with token
// @privat
router.get('/user', auth, (req, res) => {
  User.findById(req.user.id)
    .select('-password -__v')
    .then(user => res.json({ success: true, data: user }))
    .catch(err => res.status(400).json({ success: false, error: err.message }));
});

module.exports = router;

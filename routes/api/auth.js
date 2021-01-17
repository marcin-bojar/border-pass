const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('../../models/User');

const signupValidation = require('../../middlewares/signupValidation');
const hashPassword = require('../../middlewares/hashPassword');

// @route POST /api/auth/signup
// @desc Register new user
// @public
router.post(
  '/signup',
  [
    signupValidation.checkIfAllFieldsAreFilledIn,
    signupValidation.checkIfUserAlreadyExists,
    hashPassword,
  ],
  (req, res) => {
    const { name, email, password } = req.body;

    const newUser = new User({
      name,
      email,
      password,
    });

    newUser
      .save()
      .then(user => {
        jwt.sign(
          { id: user.id },
          process.env.JWT_SECRET,
          { expiresIn: 900 },
          (err, token) => {
            if (err) throw err;

            res.json({
              success: true,
              data: {
                token,
                id: user.id,
                name: user.name,
                email: user.email,
                borders: user.borders,
                countries: user.countries,
              },
            });
          }
        );
      })
      .catch(err =>
        res.status(400).json({ success: false, error: err.message })
      );
  }
);

// @route POST /api/auth/login
// @desc Sign in user
// @public
router.post('/login', (req, res) => {
  const { email, password } = req.body;

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
            { expiresIn: 900 },
            (err, token) => {
              if (err) throw err;

              res.json({
                success: true,
                data: {
                  token,
                  id: user.id,
                  name: user.name,
                  email: user.email,
                  borders: user.borders,
                  countries: user.countries,
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

module.exports = router;

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const signupValidation = require('../../middlewares/signupValidation');
const hashPassword = require('../../middlewares/hashPassword');

const User = require('../../models/User');

// @route POST /api/users
// @desc Register new user
// @public
router.post(
  '/',
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

module.exports = router;

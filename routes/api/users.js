const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const signupValidation = require('../../middlewares/signupValidation');
const User = require('../../models/User');

// @route POST /api/users
// @desc Register new user
// @public
router.post(
  '/',
  [
    signupValidation.checkIfUserAlreadyExists,
    signupValidation.checkIfAllFieldsAreFilledIn,
  ],
  (req, res) => {
    const { name, email, password } = req.body;

    const newUser = new User({
      name,
      email,
      password,
    });

    bcrypt.genSalt(10, (err, salt) => {
      if (err) throw err;

      bcrypt.hash(password, salt, (err, hash) => {
        if (err) throw err;

        newUser.password = hash;
        newUser
          .save()
          .then(user =>
            res.json({
              success: true,
              data: {
                id: user.id,
                name: user.name,
                email: user.email,
              },
            })
          )
          .catch(err =>
            res.status(400).json({ success: false, error: err.message })
          );
      });
    });
  }
);

module.exports = router;

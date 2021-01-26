const User = require('../models/User');

const checkIfUserAlreadyExists = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (user)
        res.status(400).json({
          success: false,
          error: 'Podany adres email jest już w użyciu.',
        });
      else next();
    })
    .catch(err => res.status(400).json({ success: false, error: err.message }));
};

const checkIfAllFieldsAreFilledIn = (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password)
    res.status(400).json({ success: false, error: 'Wypełnij wszystkie pola.' });
  else next();
};

module.exports = signupValidation = {
  checkIfUserAlreadyExists,
  checkIfAllFieldsAreFilledIn,
};

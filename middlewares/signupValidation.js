const User = require('../models/User');

const checkIfUserAlreadyExists = (req, res, next) => {
  const email = req.body.email.toLowerCase().trim();

  User.findOne({ email })
    .then(user => {
      if (user)
        return res.status(400).json({
          success: false,
          error: 'Podany adres email jest już w użyciu.',
        });
      next();
    })
    .catch(err => res.status(400).json({ success: false, error: err.message }));
};

const checkIfAllFieldsAreFilledIn = (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password)
    return res.status(400).json({ success: false, error: 'Wypełnij wszystkie pola.' });

  next();
};

const validatePassword = (req, res, next) => {
  const { password } = req.body;
  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[\d])[A-Za-z\d]{6,}$/;

  if (!passwordRegex.test(password))
    return res.status(400).json({
      success: false,
      error: 'Hasło musi składać się z co najmniej pięciu liter i jednej cyfry.',
    });

  next();
};

module.exports = signupValidation = {
  checkIfUserAlreadyExists,
  checkIfAllFieldsAreFilledIn,
  validatePassword,
};

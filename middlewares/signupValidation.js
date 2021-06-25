const User = require('../models/User');

const checkIfUserAlreadyExists = async (req, res, next) => {
  try {
    const email = req.body.email.toLowerCase().trim();
    const user = await User.findOne({ email });
    if (user)
      return res.status(400).json({
        success: false,
        error: 'Podany adres email jest już w użyciu.',
      });

    next();
  } catch {
    res.status(500).json({ success: false, error: 'Coś poszło nie tak, spróbuj ponownie.' });
  }
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

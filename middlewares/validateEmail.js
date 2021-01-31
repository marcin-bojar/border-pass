const validateEmail = (req, res, next) => {
  const emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
  const email = req.body.email.toLowerCase().trim();

  if (!emailRegex.test(email))
    return res.status(400).json({
      success: false,
      error: 'Podany adres email jest nieprawidłowy.',
    });

  next();
};

module.exports = validateEmail;

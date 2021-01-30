const validateEmail = (req, res, next) => {
  const emailRegex = /\S+@\S+\.\S+/;

  if (!emailRegex.test(req.body.email))
    return res.status(400).json({
      success: false,
      error: 'Podany adres email jest nieprawidłowy.',
    });

  next();
};

module.exports = validateEmail;

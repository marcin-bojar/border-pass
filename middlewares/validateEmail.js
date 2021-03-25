const validateEmail = (req, res, next) => {
  const emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
  const email = req.body.email
    ? req.body.email.toLowerCase().trim()
    : req.body.companyEmail.toLowerCase().trim();

  const isCompanyEmail = req.body.companyEmail !== null;

  if (isCompanyEmail && email.length === 0) return next();

  if (!emailRegex.test(email))
    return res.status(400).json({
      success: false,
      error: 'Podany adres email jest nieprawidłowy.',
    });

  next();
};

module.exports = validateEmail;

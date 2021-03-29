const validateEmail = (req, res, next) => {
  const emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
  let email = '';
  let isCompanyEmail;

  if (req.body.email) email = req.body.email.toLowerCase().trim();
  else if (req.body.companyEmail) {
    email = req.body.companyEmail.toLowerCase().trim();
    isCompanyEmail = true;
  }

  if (isCompanyEmail && email.length === 0) return next();

  if (!emailRegex.test(email))
    return res.status(400).json({
      success: false,
      error: 'Podany adres email jest nieprawidłowy.',
    });

  next();
};

module.exports = validateEmail;

const getEmail = reqBody => reqBody.email || reqBody.companyEmail || '';
const isCompanyEmail = reqBody => !reqBody.email && reqBody.hasOwnProperty('companyEmail');

const validateEmail = (req, res, next) => {
  // Source of email regex: https://stackoverflow.com/questions/5342375/regex-email-validation
  const emailRegex =
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

  const email = getEmail(req.body).toLowerCase().trim();

  if (isCompanyEmail(req.body) && email.length === 0) return next();

  if (!emailRegex.test(email))
    return res.status(400).json({
      success: false,
      error: 'Podany adres email jest nieprawidłowy.',
    });

  next();
};

module.exports = validateEmail;

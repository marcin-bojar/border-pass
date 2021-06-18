const validateUserName = (req, res, next) => {
  const name = req.body.name.trim();

  if (name.length > 25) {
    return res.status(400).json({
      success: false,
      error: 'Imię i nazwisko nie może mieć wiecej niż 25 znaków.',
    });
  }

  if (name.length < 3) {
    return res.status(400).json({
      success: false,
      error: 'Imię i nazwisko nie może być krótsze niż 3 znaki.',
    });
  }

  next();
};

module.exports = validateUserName;

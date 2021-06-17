const validateUserName = (req, res, next) => {
  const name = req.body.name;

  if (name.length > 25) {
    return res.status(400).json({
      success: false,
      error: 'Imię i nazwisko nie może mieć wiecej niż 25 znaków.',
    });
  }
  next();
};

module.exports = validateUserName;

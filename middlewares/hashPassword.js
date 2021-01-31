const bcrypt = require('bcryptjs');

const hashPassword = (req, res, next) => {
  const { password } = req.body;

  bcrypt.genSalt(10, (err, salt) => {
    if (err)
      return res.status(500).json({
        success: false,
        error: 'Coś poszło nie tak... spróbuj ponownie.',
      });

    bcrypt.hash(password, salt, (err, hash) => {
      if (err)
        return res.status(500).json({
          success: false,
          error: 'Coś poszło nie tak... spróbuj ponownie.',
        });

      req.body.password = hash;
      next();
    });
  });
};

module.exports = hashPassword;

const bcrypt = require('bcryptjs');

const hashPassword = (req, res, next) => {
  const { password } = req.body;

  bcrypt.genSalt(10, (err, salt) => {
    if (err) throw err;

    bcrypt.hash(password, salt, (err, hash) => {
      if (err) throw err;

      req.body.password = hash;
      next();
    });
  });
};

module.exports = hashPassword;

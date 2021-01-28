const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const token = req.header('x-access-token');

  if (!token)
    return res.status(401).json({
      success: false,
      error: 'Nie masz uprawnień do wykonania tej operacji. Zaloguj się.',
    });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err)
      return res.status(401).json({
        success: false,
        error: 'Twoja sesja wygasła. Zaloguj się ponownie.',
      });

    if (req.params.userId && req.params.userId !== decoded.id) {
      return res.status(401).json({
        success: false,
        error: 'Nie masz uprawnień do edycji tego konta.',
      });
    }

    req.user = decoded;
    next();
  });
};

module.exports = auth;

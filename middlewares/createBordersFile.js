const fs = require('fs');
const path = require('path');
const minify = require('html-minifier').minify;

const createTableMarkup = require('../helpers/createTableMarkup');

const createBordersFile = (req, res, next) => {
  const userId = req.user.id;
  const borders = req.body.borders;

  if (!borders) {
    return res.status(400).json({
      success: false,
      error: 'Brak danych. Wybierz zakres danych i spróbuj ponownie.',
    });
  }

  User.findById(userId)
    .select('name')
    .then(user => {
      const markup = createTableMarkup(user, borders);

      const minifiedMarkup = minify(markup, {
        minifyCSS: true,
        minifyJS: true,
        collapseInlineTagWhitespace: true,
        collapseWhitespace: true,
      });

      const filename = `${userId}.${Date.now()}.html`;
      const tempDir = path.join(path.dirname(require.main.filename), 'temp');

      fs.access(tempDir, err => {
        if (err)
          fs.mkdir(tempDir, err => {
            if (err)
              return res.status(500).json({
                success: false,
                error: 'Coś poszło nie tak, spróbuj ponownie',
              });
          });

        fs.writeFile(path.join(tempDir, filename), minifiedMarkup, err => {
          if (err)
            return res.status(500).json({
              success: false,
              error: 'Coś poszło nie tak, spróbuj ponownie',
            });

          req.filename = filename;
          req.markup = minifiedMarkup;
          next();
        });
      });
    })
    .catch(() =>
      res.status(500).json({
        success: false,
        error: 'Coś poszło nie tak, spróbuj ponownie.',
      })
    );
};

module.exports = createBordersFile;

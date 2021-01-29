const dateRegex = /^\d{2}\.\d{2}\.\d{4}$/;
const timeRegex = /[0-2]\d:\d{2}/;

const validateTimeAndDate = (req, res, next) => {
  const { time, date } = req.body;

  if (!dateRegex.test(date))
    return res
      .status(400)
      .json({ success: false, error: 'Niepoprawny format daty.' });

  if (!timeRegex.test(time))
    return res
      .status(400)
      .json({ success: false, error: 'Niepoprawny format godziny.' });

  next();
};

module.exports = validateTimeAndDate;

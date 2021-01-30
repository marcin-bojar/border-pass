const dateRegex = /^(0[0-9]|1[0-9]|2[0-9]|3[0-1])\.(0[1-9]|1[1-2])\.\d{4}$/;
const timeRegex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;

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

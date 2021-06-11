// on some mobile browsers html maxlength attribute lets user enter more chars than allowed and cuts the input only on focus out
// this lets user to submit longer input than expected which is why this middleware was created
const validateCountry = (req, res, next) => {
  let country = req.body.name;

  country = country.length > 3 ? country.substring(0, 3) : country;
  req.country = country;
  next();
};

module.exports = validateCountry;

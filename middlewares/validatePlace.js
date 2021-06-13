// on some mobile browsers html maxlength attribute lets user enter more chars than allowed and cuts the input only on focus out
// this lets user to submit longer input than expected which is why this middleware was created
const validatePlace = (req, res, next) => {
  let place = req.body.name;

  place = place.length > 15 ? place.substring(0, 15) : place;
  req.place = place;
  next();
};

module.exports = validatePlace;

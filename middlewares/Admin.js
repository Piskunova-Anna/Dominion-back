module.exports = (req, res, next) => {
    User.findById(req.user._id)
  
    next(); // пропускаем запрос дальше
  };
  
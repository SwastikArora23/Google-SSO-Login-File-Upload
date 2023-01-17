const jwt = require('jsonwebtoken');
const User = require('../model/user');

module.exports = async (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const validUser = await User.findById(decodedToken.id);
    if (!validUser) {
      throw 'Invalid User';
    } else {
      req.user = validUser;
      next();
    }
};

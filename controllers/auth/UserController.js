
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
var config = require("../../config/config")[process.env.NODE_ENV];
var verifyToken = require("./token");

var models = require("../../models");

const register = (req, res) => {
  var salt = bcrypt.genSaltSync(10);
  var hashedPassword = bcrypt.hashSync(req.body.password, salt);
  models.User.create({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
    phone: req.body.phone
  }).then(function (user) {
    var token = jwt.sign({ id: user.id }, config.secret, { expiresIn: 86400 });
    res.status(200).send({ message: `user ${req.body.email} has been added.`, auth: true, token: token });
  });
};

const login = (req, res) => {
  models.User.findOne({
    where: { email: req.body.email }
  }).then(function (user) {
    console.log(user.password);
    console.log(req.body.password);
    console.log(config.salt);
    var isPasswordValid = bcrypt.compareSync(req.body.password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send({ auth: false, token: null });
    } else {
      var token = jwt.sign({ id: user.id }, config.secret, { expiresIn: 86400 });
      return res.status(200).send({ auth: true, token: token });
    }
  });
};

const logout = (req, res) => {
  models.User.findOne({
    where: { email: req.body.email }
  }).then(function (user) {
    // needs to set token expiration
    return res.status(200).send(`user ${user.email} has logout`);
  });
};

/**
 * @description check if the token is valid by giving the user info
 */
const verifyme = (req, res) => {
  console.log(2);//
  models.User.findById(req.userId).then((user) => {
    console.log(user);
    if (user) {
      res.status(200).send(user);
    } else {
      res.status(404).send("user can't be found");
    }
  });
};

module.exports = {
  register,
  login,
  logout,
  verifyme,
  verifyToken
};

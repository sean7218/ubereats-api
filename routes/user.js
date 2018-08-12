var express = require('express');
var router = express.Router();
var models = require('../models');
var bodyParser = require('body-parser');
var userController = require('../controllers/auth/user');

router.use(bodyParser.urlencoded({ extended: true }));

router.get('/', function(req, res, next) {
  models.User.findAll().then(function(users){
    res.json(users);
  });
});

router.get('/:id', function(req, res, next) {
  let email = req.params.email;
  console.log(email);
  models.User.findById(req.params.id).then(function(user){
    return res.send(user);
  });
});

router.put('/:id', function(req, res){
    models.User.findById(req.params.id)
    .then(function(user){
        user.update({
            name: req.body.name,
            phone: req.body.phone,
        });
        return res.send(`user ${req.body.name} updated`);
    });
});

router.delete('/:id', function(req, res){
    models.User.destroy({
        where: {
            id: req.params.id
        }
    }).then(function(user){
        return res.send(`the user ${req.params.id} has been deleted`);
    });
});

router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/verify/me', userController.verifyToken, userController.verifyme);

module.exports = router;
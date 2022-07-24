const router = require('express').Router();
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const Case = require('../models/blog');
const config = require('../config');
const checkJWT = require('../middlewares/check-jwtuser');


router.post('/signup', (req, res, next) => {
 let user = new User();
 user.name = req.body.name;
 user.email = req.body.email;
 user.password = req.body.password;
 user.mobile = req.body.mobile;
 user.picture = user.gravatar();

 User.findOne({ email: req.body.email }, (err, existingUser) => {
  if (existingUser) {
    res.json({
      success: false,
      message: 'Account with that email is already exist'
    });

  } else {
    user.save();

    var token = jwt.sign({
      user: user,
      islawyer:false
    }, config.secret, {
      expiresIn: '7d'
    });

    res.json({
      success: true,
      message: 'Enjoy your token',
      token: token
    });
  }

 });
});

router.post('/login', (req, res, next) => {

  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) throw err;

    if (!user) {
      res.json({
        success: false,
        message: 'Authenticated failed, User not found'
      });
    } else if (user) {

      var validPassword = user.comparePassword(req.body.password);
      if (!validPassword) {
        res.json({
          success: false,
          message: 'Authentication failed. Wrong password'
        });
      } else {
        var token = jwt.sign({
          user: user,
          islawyer:false
        }, config.secret, {
          expiresIn: '7d'
        });

        res.json({
          success: true,
          mesage: "Enjoy your token",
          token: token
        });
      }
    }

  });
});

router.route('/profile')
  .get(checkJWT, (req, res, next) => {
    User.findOne({ _id: req.decoded.user._id }, (err, user) => {
      res.json({
        success: true,
        user: user,
        message: "Successful"
      });
    });
  })
  .post(checkJWT, (req, res, next) => {
    User.findOne({ _id: req.decoded.user._id }, (err, user) => {
      if (err) return next(err);

      if (req.body.name) user.name = req.body.name;
      if (req.body.email) user.email = req.body.email;
      if (req.body.password) user.password = req.body.password;
      if (req.body.mobile) user.mobile = req.body.mobile;

      user.save();
      res.json({
        success: true,
        message: 'Successfully edited your profile'
      });
    });
  });


  router.get('/blogs', checkJWT, (req, res, next) => {
    Case.find({ User: req.decoded.user._id })
      // .populate('User')
      .exec((err, cases) => {
        if (err) {
          res.json({
            success: false,
            message: "Couldn't find your Blogs"
          });
        } else {
          res.json({
            success: true,
            message: 'Found your Blogs',
            cases: cases
          });
        }
      });
  });


  router.post('/newBlog', checkJWT, (req, res, next) => {
    let newcase = new Case();
    newcase.User=req.decoded.user._id;
    newcase.title = req.body.title;
    newcase.body = req.body.body;
    newcase.image = req.body.image;
    try{
      newcase.save()
      res.json({
        success: true,
        message: 'Added succesfully',
      });
    }catch(e){
      console.log(e)
      res.json({
        success: false,
        message: e.message,
      });      
    }
  });

    router.get('/allcases', checkJWT, (req, res, next) => {
    Case.find()
      // .populate('User')
      .exec((err, cases) => {
        if (err) {
          res.json({
            success: false,
            message: "Couldn't find your Blogs"
          });
        } else {
          res.json({
            success: true,
            message: 'Found your Blogs',
            cases: cases
          });
        }
      });
  });

  // router.get('/cases/:id', checkJWT, (req, res, next) => {
  //   Case.findOne({ _id: req.params.id })
  //     .populate('User')
  //     .exec((err, cases) => {
  //       if (err) {
  //         res.json({
  //           success: false,
  //           message: "Couldn't find your case"
  //         });
  //       } else {
  //         res.json({
  //           success: true,
  //           message: 'Found your case',
  //           cases: cases
  //         });
  //       }
  //     });
  // });

module.exports = router;
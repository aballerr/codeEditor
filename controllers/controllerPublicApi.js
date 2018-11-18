const router = require('express').Router();
const User = require('../models/index').User;
const codeFile = require('../models/index').codeFile;
const jwt = require('jsonwebtoken');
const secret = require('../config/config').secret;

console.log('called');
// authenticates a user
router.post('/authenticate', (req, res) => {
  let { email, password } = req.body;

  User.findOne({
    where: {
      email: email
    }
  })
    .then((success) => {
      let savedPassword = success.dataValues.password;
      if (password === savedPassword) {
        const token = jwt.sign(success.dataValues, secret, {
          expiresIn: 604800 // seven days
        });

        res.json({
          success: true,
          token: 'JWT ' + token  // tears for fears
        });
      } else {
        res.json({
          success: false
        })
      }
    })
    .catch((err) => res.send(err));
});

// gets a codefile based on its id
router.get('/codeFile/id/:id', (req, res, next) => {
  let id = req.params.id;
  codeFile.findOne({
    where: {
      id: id
    }
  }).then((data) => {

    res.send(data);
  })
    .catch((err) => {
      console.log(err);
      // res.send(err);
    })
});

// Gets a code file based on its name
router.get('/codeFile/filename/:filename', async (req, res) => {
  let filename = req.params.filename;

  codeFile.find({
    where: {
      filename: filename
    }
  }).then((data) => {
    let contentType = data.fileType === 'javascript' ? 'text/javascript' : 'text/css';
    res.writeHead(200, {
      'Content-Type': contentType
    })
    res.end(data.code);
  });
});


module.exports = router;
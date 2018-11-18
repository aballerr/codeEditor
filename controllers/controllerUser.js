const router = require('express').Router();
const User = require('../models/index').User;

// returns true if the user is authenticated
router.get('/isAuthenticated', (req, res) => {
  res.send({
    isAuthenticated: true
  })
});


// update a user
router.put('/user', (req, res) => {
  // console.log(req.body);
  // console.log(req.user);

  console.log(req.body);

  User.update(req.body, {
    where: {
      id: req.user.id
    }
  })
  .then(() => {
    res.send('success');
  })
  .catch((err) => console.log(err));
})

router.get('/user', (req, res) => {
  delete req.user.password;

  res.send(req.user);
});


router.get('/user/settings', (req, res) => {
  if(req.user) {
    let user = req.user;
    delete user.id;
    delete user.email;
    delete user.password;
    user.fontSize = parseInt(user.fontSize.slice(0, -2));
    user.tabSpacing = parseInt(user.tabSpacing);
    res.send(user);
  }
  else res.send('USER DOES NOT EXIST')
});

module.exports = router;
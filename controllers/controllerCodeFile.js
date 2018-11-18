// Undecided on the naming, but this is the routes for the code files
const router = require('express').Router();
const codeFile = require('../models/index').codeFile;


// gets all the current existing code files
router.get('/codeFile',  (req, res) => {
  codeFile.findAll()
  .then((data) => res.send(data))
  .catch((err) => res.send(err));
});



// Creates a new code file to edit
router.post('/codeFile', (req, res) => {
  codeFile.create({
    name: '',
    file: '',
    fileType: 'javascript'
  })
    .then((data) => {
      let id = data.dataValues.id;
      res.send(`${id}`);
    })
    .catch((err) => res.send(err));
});


// Updates an existing code file
router.put('/codeFile/:id', (req, res) => {
  codeFile.update(req.body, {
      where: {
        id: req.params.id
      }
    }).then(() => {
      res.send('success');
    })
    .catch((err) => console.log(err));
});

router.delete('/codeFile/:id', (req, res) => {

  console.log(typeof req.params.id);
  let id = parseInt(req.params.id);
  codeFile.destroy({
      where: {
        id: id
      }
    })
    .then(() => res.send('success'))
    .catch((err) => res.send(err))
});


module.exports = router;
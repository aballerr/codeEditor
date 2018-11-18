const router = require('express').Router();
const controllerCodeFile = require('./controllerCodeFile');
const controllerUser = require('./controllerUser');

router.use('', controllerCodeFile);
router.use('', controllerUser);

module.exports = router;
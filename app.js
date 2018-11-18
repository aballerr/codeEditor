const express = require('express');
const app = require('express')();
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');

const controllerPublicApi = require('./controllers/controllerPublicApi');
const controllerApi = require('./controllers/controllerApi');
const PORT = 80;



// TODO
// Write out the api endpoints in an organized way that makes sense
// edit the front end to follow best practices and work with the given endpoints
// maybe considering adding a settings to frontend to give user control over stuff
// Add tabs to frontend for more versatile editing
// move everything into a server folder

app.use(require('cors')());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, './frontend/build')));
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);





//controllers
app.use('/public-api', controllerPublicApi);
app.use('/api', passport.authenticate('jwt', { session: false }), controllerApi);

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, './frontend/build', 'index.html'));
});
app.listen(PORT, () => {
  console.log('listening on port: ' + PORT);
});

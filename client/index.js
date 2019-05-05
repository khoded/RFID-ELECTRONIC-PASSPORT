const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const config = require('./config');


const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const cors = require('cors');



// connect to the database and load models
require('./server/models').connect(config.dbUri);

const app = express();




app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(fileUpload());







// tell the app to look for static files in these directories
app.use(express.static('./server/static/'));
app.use(express.static('./client/dist/'));
// tell the app to parse HTTP body messages
app.use(bodyParser.urlencoded({ extended: false }));
// pass the passport middleware
app.use(passport.initialize());

// load passport strategies
const localSignupStrategy = require('./server/passport/local-signup');
const localLoginStrategy = require('./server/passport/local-login');
passport.use('local-signup', localSignupStrategy);
passport.use('local-login', localLoginStrategy);

// pass the authenticaion checker middleware
const authCheckMiddleware = require('./server/middleware/auth-check');
app.use('/api', authCheckMiddleware);

// routes
const authRoutes = require('./server/routes/auth');
const apiRoutes = require('./server/routes/api');
app.use('/auth', authRoutes);
app.use('/api', apiRoutes);


app.post('/upload', (req, res, next) => {
  console.log(req);
  let imageFile = req.files.file;

  imageFile.mv(`${__dirname}/upload/${req.body.filename}.png`, function(err) {
    if (err) {
      return res.status(500).send(err);
    }

    res.json({file: `upload/${req.body.filename}.png`});
  });

})


// Set Port, hosting services will look for process.env.PORT
app.set('port', (process.env.PORT || 5050));

// start the server
app.listen(app.get('port'), () => {
  console.log(`Server is running on port ${app.get('port')}`);
});

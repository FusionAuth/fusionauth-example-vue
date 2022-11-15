const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const session = require("express-session")

//////////////////////////////////////////////////////////////////////
// This should be externalized somehow, but suffices for a demo.
process.env.SERVER_PORT=3000
process.env.FUSIONAUTH_PORT=9011
process.env.CLIENT_ID='E9FDB985-9173-4E01-9D73-AC2D60D1DC8E'
process.env.CLIENT_SECRET='this_really_should_be_regenerated_every_so_often'
process.env.REDIRECT_URI='http://localhost:3000/oauth-callback'
process.env.APPLICATION_ID='E9FDB985-9173-4E01-9D73-AC2D60D1DC8E'
process.env.API_KEY='this_really_should_be_a_long_random_alphanumeric_value_but_this_still_works'

// If you really want to externalize the configuration, one way to do that
// is to put the above settings into a ".env" file in this directory, and
// load it using the "dotenv" package, below. Uncomment the below if you do 
// that; it will populate the process's environment variables with the contents
// of the .env file, and make them accessible via "process.env.{SETTING}",
// a la "process.env.SERVER_PORT"
//require("dotenv").config();

const app = express();

// Use our middlewares
app.use(cors({ origin: true, credentials: true }));
app.use(morgan("common"));
app.use(express.json());
app.use(session(
  {
    secret: '1234567890', // don't use this secret in prod :)
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: 'auto',
      httpOnly: true,
      maxAge: 3600000
    }
  })
);

// Provide a default port 
const port =  process.env.SERVER_PORT || 3000;

// Listen to server  
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

app.get("/", (req, res) => {
    res.send({
     message:"FusionAuth Example With Vue"
    });
});

// routes
app.use('/user', require('./routes/user'))
app.use('/login', require('./routes/login'))
app.use('/logout', require('./routes/logout'))
app.use('/oauth-callback', require('./routes/oauth-callback'))
app.use('/set-user-data', require('./routes/set-user-data'))
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const session = require("express-session")

// dotenv
require("dotenv").config();

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
app.use('/oauth-callback', require('./routes/oauth-callback'))
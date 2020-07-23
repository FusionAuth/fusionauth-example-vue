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


// configure sessions
app.use(session(
  {
    secret: '1234567890',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: 'auto',
      httpOnly: true,
      maxAge: 3600000
    }
  })
);

// Main Page
app.get("/", (req, res) => {
    res.send({
     message:"FusionAuth Example Vue"
    });
  });

// Routes
app.use('/user', require('./routes/user'))
app.use('/login', require('./routes/login'))
app.use('/oauth-callback', require('./routes/oauth-callback'));
app.use('/logout', require('./routes/logout'));
app.use('/set-user-data', require('./routes/set-user-data'));



// Provide a defualt port 
const port =  process.env.SERVER_PORT || 3000;

// Listen to server  
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });

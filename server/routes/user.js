const express = require("express");
const router = express.Router();
const axios = require("axios");
const qs = require("querystring");

router.get("/", (req, res) => {
  // token in session -> get user data and send it back to the vue app
  if (req.session.token) {
    axios
      .post(
        `http://localhost:${process.env.FUSIONAUTH_PORT}/oauth2/introspect`,
        qs.stringify({
          client_id: process.env.CLIENT_ID,
          token: req.session.token,
        })
      )
      .then((result) => {
        let introspectResponse = result.data;
        // valid token -> get more user data and send it back to the Vue app
        if (introspectResponse) {
          
          // GET request to /registration endpoint
          axios
            .get(
              `http://localhost:${process.env.FUSIONAUTH_PORT}/api/user/registration/${introspectResponse.sub}/${process.env.APLICATION_ID}`,
              {
                headers: {
                  Authorization: process.env.API_KEY,
                },
              }
            )
            .then((response) => {
              res.send({
                introspectResponse: introspectResponse,
                body: response.data.registration,
              });
            })
        }
      // expired token -> send nothing 
        else {
          req.session.destroy();
          res.send({});
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
   // no token -> send nothing
   else {
    res.send({});
  }
});

module.exports = router;


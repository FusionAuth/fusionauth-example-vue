const express = require("express");
const router = express.Router();
const axios = require("axios").default;
const qs = require("query-string");

const config = {
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
};
const url = `http://localhost:${process.env.FUSIONAUTH_PORT}/oauth2/token`;

router.get("/", (req, res) => {
    // State from Server
    const stateFromServer = req.query.state;

    if (stateFromServer !== req.session.stateValue) {
      console.log("State doesn't match. uh-oh.");
      console.log(`Saw: ${stateFromServer}, but expected: &{req.session.stateValue}`);
      res.redirect(302, '/');
      return;
    }
    //post request to token endpoint
    axios.post(
      url,
      qs.stringify({
        'client_id': process.env.CLIENT_ID,
        'client_secret': process.env.CLIENT_SECRET,
        'code': req.query.code,
        'code_verifier': req.session.verifier,
        'grant_type': "authorization_code",
        'redirect_uri': process.env.REDIRECT_URI
      }),
      config
    )
    .then((result) => {
      // save token to session
      req.session.token = result.data.access_token;
      //redirect to Vue app
     res.redirect(`http://localhost:8081`);
    })
    .catch((err) => {
      console.error(err);
    });
});
module.exports = router;


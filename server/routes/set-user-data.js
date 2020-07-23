const express = require("express");
const router = express.Router();
const axios = require("axios");
const qs = require("query-string");

router.post("/", (req, res) => {

 // POST request to /introspect endpoint
  axios
    .post(
      `http://localhost:${process.env.FUSIONAUTH_PORT}/oauth2/introspect`,
      qs.stringify({
        client_id: process.env.CLIENT_ID,
        token: req.session.token,
      })
    )
    .then((response) => {
      let introspectResponse = response.data;
    
      // PATCH request to /registration endpoint
      axios.patch(
        `http://localhost:${process.env.FUSIONAUTH_PORT}/api/user/registration/${introspectResponse.sub}/${process.env.APLICATION_ID}`,
        {
          registration: {
            data: req.body,
          },
        },
        {
          headers: {
            Authorization: process.env.API_KEY,
          },
        }
      ).catch(err=>{
          console.log(err)
      })
    })
    .catch((err) => {
      console.error(err);
    });


});

module.exports = router;

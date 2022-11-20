const express = require("express");
const router = express.Router();
const axios = require("axios");
const qs = require("querystring");
  
router.get("/", (req, res) => {
    console.log("process.env.API_KEY", process.env.API_KEY);
    console.log("process.env.CLIENT_ID", process.env.CLIENT_ID);
    console.log("process.env.FUSIONAUTH_PORT", process.env.FUSIONAUTH_PORT);
    console.log("req.session.token", req.session.token);


    // token in session -> get user data and send it back to the vue app
    if (req.session.token) {
        console.log("token in session");
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
                console.log("introspectResponse", introspectResponse);

                // valid token -> get more user data and send it back to the Vue app
                if (introspectResponse) {

                    // GET request to /registration endpoint
                    axios
                        .get(
                            `http://localhost:${process.env.FUSIONAUTH_PORT}/api/user/registration/${introspectResponse.sub}/${process.env.APPLICATION_ID}`,
                            {
                                headers: {
                                    Authorization: process.env.API_KEY,
                                },
                            }
                        )
                        .then((response) => {
                            res.send({
                                authState: "Authorized",
                                introspectResponse: introspectResponse,
                                body: response.data.registration,
                            });
                        })
                        .catch((err) => {
                            res.send({
                                authState: "notAuthorized"
                            });
                            console.log(err)
                            return
                        })
                }
                // expired token -> send nothing
                else {
                    req.session.destroy();
                    res.send({
                        authState: "notAuthenticated"
                    });
                }
            })
            .catch((err) => {
                console.log("Erorr oauth2/introspect:", err);
            });
    }
    // no token -> send nothing
    else {
        console.log("No token");
        res.send({
            authState: "notAuthenticated"
        });
    }
});
module.exports = router;
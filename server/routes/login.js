const express = require('express');
const router = express.Router();
const pkce = require('../helpers/pkce');

router.get('/', (req, res) => {
  // Generate and store the PKCE verifier
  req.session.verifier = pkce.generateVerifier();
  // Generate the PKCE challenge
  const challenge = pkce.generateChallenge(req.session.verifier);

  const stateValue = Math.random().toString(36).substring(2,15) + Math.random().toString(36).substring(2,15) + Math.random().toString(36).substring(2,15) + Math.random().toString(36).substring(2,15) + Math.random().toString(36).substring(2,15) + Math.random().toString(36).substring(2,15);

  req.session.stateValue = stateValue

  res.redirect(`http://localhost:${process.env.FUSIONAUTH_PORT}/oauth2/authorize?client_id=${process.env.CLIENT_ID}&redirect_uri=${process.env.REDIRECT_URI}&response_type=code&state=${stateValue}&code_challenge=${challenge}&code_challenge_method=S256`);
});

module.exports = router;
const express = require('express');
const router = express.Router();
    
router.get('/', (req, res) => {
  res.send({
    user: {
      email: 'dinesh@fusionauth.io'
    }
  });
});
module.exports = router;
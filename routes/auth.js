const express       = require('express'),
      router        = express.Router,
      { signup }    = require('../handlers/auth');
      
router.post('/signup', signup);

module.exports = router;
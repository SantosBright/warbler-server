const express       =   require('express'),
      router        =   express.Router(),
      { signup, signin }    =   require('../handlers/auth');
      
router.post('/signup', signup);
router.post('/signin', signin);

module.exports = router;
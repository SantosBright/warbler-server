const express       =   require('express'),
      router        =   express.Router(),
      { signup, signin }    =   require('../handlers/auth');
 
router.post('/signin', signin);
router.post('/signup', signup);


module.exports = router;
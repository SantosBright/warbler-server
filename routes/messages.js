const express    =   require('express'),
      router     =   express.Router({ mergeParams: true });

const { createMessage } = require('../handlers/messages');

router.route('/').post(createMessage);

module.exports = router;
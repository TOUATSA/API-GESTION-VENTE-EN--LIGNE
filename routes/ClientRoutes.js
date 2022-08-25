
const express = require('express');
const ClientController=require('../Controllers/clientDAO')

const router = express.Router();

router.post('/', ClientController.createClient);

  router.post('/connecte', ClientController.loginClient )

  router.get('/', ClientController.compteClient);


module.exports = router;


const express = require('express');
const CommandeController=require('../Controllers/CommandeDAO')
const auth = require('../middleware/auth')

const router = express.Router();

  router.get('/unprocess', auth, CommandeController.allCommandeUnProcess);

  router.get('/full', auth, CommandeController.allCommandFull);
  
  router.put('/update_cmd', auth, CommandeController.updateCommande )

module.exports = router;

const express = require('express');
const CommandeController=require('../Controllers/CommandeDAO')
const auth = require('../middleware/auth')

const router = express.Router();

router.post('/', auth, CommandeController.createCommande);

  router.get('/unprocess', auth, CommandeController.allCommandeUnProcess);

  router.get('/full', auth, CommandeController.allCommandFull);

  router.get('/:nom_client', auth, CommandeController.commandeForAClient);

module.exports = router;
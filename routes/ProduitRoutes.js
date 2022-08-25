
const express = require('express');
const ProduitController=require('../Controllers/ProduitDAO')

const multer = require('../middleware/multer_config');
const auth = require('../middleware/auth')

const router = express.Router();

router.post('/', auth, ProduitController.createProduit);

  router.get('/', multer, ProduitController.allProduit);

  router.get('/:id', ProduitController.findOneProduit);

  router.put('/:id_produit/:value_field/:change_field', auth, ProduitController.updateProduit);

module.exports = router;
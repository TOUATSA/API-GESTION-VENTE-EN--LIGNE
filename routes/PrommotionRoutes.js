
const express = require('express');
const PrommotionController=require('../Controllers/PrommotionDAO')

const multer = require('../middleware/multer_config');
const auth = require('../middleware/auth')

const router = express.Router();

router.post('/', auth, PrommotionController.ouvrirPrommotion);

  router.delete('/fermer/:code_promo', auth, PrommotionController.fermerPromotion);

  router.get('/addproduit/:id_produit/:prix_promo', auth, PrommotionController.addProductForPromo);

  router.put('/:id_produit/:value_field/:change_field', ProduitController.updateProduit);

module.exports = router;
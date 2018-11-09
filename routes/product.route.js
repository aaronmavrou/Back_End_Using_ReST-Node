const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const product_controller = require('../controllers/product.controller');


// a simple test url to check that all of our files are communicating correctly.
router.get('/test', product_controller.test);
module.exports = router;

router.post('/create', product_controller.product_create);

router.get('/getall', product_controller.product_getall);

router.get('/getone/:id', product_controller.product_details);

router.put('/update/:id', product_controller.product_update);

router.delete('/delete/:id', product_controller.product_delete);

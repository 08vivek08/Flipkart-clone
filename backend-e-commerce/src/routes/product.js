const express = require("express");
const router = express.Router();
const { addProduct,getProducts, getProductBySlug } = require("../controllers/product");
const { requireSignin, adminMiddleware } = require("../common-middleware/index");
const upload = require('../common-middleware/upload');

router.post('/product/create', requireSignin, adminMiddleware, upload.array('productPicture'), addProduct);
router.get('/getProducts', getProducts);
router.get('/products/:slug', getProductBySlug);

module.exports = router;
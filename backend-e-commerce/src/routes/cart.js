const express = require("express");
const router = express.Router();
const { addtoCart, getCart } = require("../controllers/cart");
const { requireSignin, userMiddleware } = require("../common-middleware/index");

router.post('/cart/addtocart', requireSignin, addtoCart);
router.get('/cart/getCart', requireSignin, getCart);


module.exports = router;
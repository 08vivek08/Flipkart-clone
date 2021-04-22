const Cart = require("../models/cart");
const Product = require('../models/product');

exports.addtoCart = (req, res) => {

    Product.findOne({ _id: req.body.cartItem.product })
        .exec((error, pro) => {
            if (error) return res.status(400).json({ error });
            if (pro) {
                const cartItem = req.body.cartItem;
                Cart.findOne({ user: req.user._id })
                    .exec((error, cart) => {
                        if (error) return res.status(400).json({ error });
                        if (cart) {
                            const item = cart.cartItems.find(it => (it.product == cartItem.product));
                            if (!item) {
                                if (cartItem.quantity < 0) cartItem.quantity = 0;
                                cartItem.price = pro.price * cartItem.quantity;
                                cart.cartItems.push(cartItem);
                            }
                            else {
                                item.quantity += cartItem.quantity;
                                if (item.quantity < 0) item.quantity = 0;
                                item.price = pro.price * item.quantity;
                            }
                        }
                        else {
                            const user = req.user._id;
                            if (cartItem.quantity < 0) cartItem.quantity = 0;
                            cartItem.price = pro.price * cartItem.quantity;
                            const cartItems = [cartItem];
                            cart = new Cart({ user, cartItems });
                        }
                        cart.save((error, c) => {
                            if (error) return res.status(400).json({ error });
                            if (c) {
                                return res.status(201).json({ cart: c });
                            }
                        });
                    });
            }
        });
}

exports.getCart = (req, res) => {
    return res.status(200).json({ message: "hello cart" });
}
const Product = require('../models/product');
const slugify = require('slugify');
const Category = require('../models/category');

exports.getProducts = async (req, res) => {
    const products = await Product.find({})
        .populate({ path: 'category', select: '_id name' })
        .exec();
    return res.status(200).json({
        productList: products.map((product) => product)
    });
}

exports.getProductBySlug = (req, res) => {
    const { slug } = req.params;
    // return res.status(200).json({ slug });
    Category.findOne({ slug: slug })
        .select('_id')
        .exec((error, category) => {
            if (error) {
                return res.status(400).json({ error });
            }
            if (category) {
                Product.find({ category: category._id })
                    .exec((err, products) => {
                        if (err) {
                            return res.status(400).json({ err });
                        }
                        if (products.length > 0) {
                            const under5k = [], under10k = [], under15k = [], under20k = [], over20k = [];
                            products.forEach((pro) => {
                                if (pro.price <= 5000) {
                                    under5k.push(pro);
                                }
                                else if (pro.price <= 10000) {
                                    under10k.push(pro);
                                }
                                else if (pro.price <= 15000) {
                                    under15k.push(pro);
                                }
                                else if (pro.price <= 20000) {
                                    under20k.push(pro);
                                }
                                else if (pro.price > 20000) {
                                    over20k.push(pro);
                                }
                            });
                            return res.status(200).json({
                                products,
                                productsByPrice: {
                                    under5k,
                                    under10k,
                                    under15k,
                                    under20k,
                                    over20k
                                }
                            });
                        }
                    });
            }
        });
}

exports.addProduct = (req, res) => {
    // return res.status(200).json({ file: req.files, body: req.body });
    const {
        name, price, description, category, quantity
    } = req.body;
    let productPictures = [];
    if (req.files && req.files.length > 0) {
        productPictures = req.files.map((f) => { return { img: process.env.API + 'public/' + f.filename } });
    }
    else if (req.body.productPicturesUrl && typeof (req.body.productPicturesUrl) == 'string') {
        productPictures.push({ img: req.body.productPicturesUrl });
    }
    else if (req.body.productPicturesUrl && req.body.productPicturesUrl.length > 0) {
        productPictures = req.body.productPicturesUrl.map((url) => ({ img: url }));
    }

    const product = new Product({
        name,
        slug: slugify(name),
        price,
        quantity,
        description,
        productPictures,
        category,
        createdBy: req.user._id,
        // updatedAt: Date.now()
    });

    product.save((error, prod) => {
        if (error) return res.status(400).json({ error });
        if (prod) {
            return res.status(201).json({ product: prod });
        }
    });
}
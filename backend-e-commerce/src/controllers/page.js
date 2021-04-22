const { update } = require('../models/page');
const Page = require('../models/page');

exports.createPage = (req, res) => {
    if (req.files && req.files.banners) {
        const { banners } = req.files;
        if (banners && banners.length > 0) {
            req.body.banners = banners.map((banner, index) => ({
                img: `${process.env.API}public/${banner.filename}`,
                navigateTo: `/bannerClicked?categoryId=${req.body.category}&type=${req.body.type}`
            }));
        }
    }
    else {
        const { banners } = req.body;
        if (banners) {
            if (typeof (banners) === 'string') {
                req.body.banners = [{
                    img: banners,
                    navigateTo: `/bannerClicked?categoryId=${req.body.category}&type=${req.body.type}`
                }];
            }
            else {
                req.body.banners = banners.map((url, index) => ({
                    img: url,
                    navigateTo: `/bannerClicked?categoryId=${req.body.category}&type=${req.body.type}`
                }));
            }
        }

    }
    if (req.files && req.files.products) {
        const { products } = req.files;
        if (products && products.length > 0) {
            req.body.products = products.map((product, index) => ({
                img: `${process.env.API}public/${product.filename}`,
                navigateTo: `/productClicked?categoryId=${req.body.category}&type=${req.body.type}`
            }));
        }
    }
    else {
        const { products } = req.body;
        if (products) {
            if (typeof (products) === 'string') {
                req.body.products = [{
                    img: products,
                    navigateTo: `/productClicked?categoryId=${req.body.category}&type=${req.body.type}`
                }];
            }
            else {
                req.body.products = products.map((url, index) => ({
                    img: url,
                    navigateTo: `/productClicked?categoryId=${req.body.category}&type=${req.body.type}`
                }));
            }
        }
    }
    req.body.createdBy = req.user._id;
    console.log(req.body);
    Page.findOne({ category: req.body.category })
        .exec((error, updatedPage) => {
            if (error) return res.status(400).json({ error });
            if (updatedPage) {
                updatedPage.overwrite(req.body);
                updatedPage.save((err, newPage) => {
                    if (err) return res.status(400).json({ error });
                    if (newPage) return res.status(201).json({ page: newPage });
                });
            }
            else {
                const page = new Page(req.body);
                page.save((err, newPage) => {
                    if (err) return res.status(400).json({ error });
                    if (newPage) return res.status(201).json({ page: newPage });
                });
            }
        });
}

exports.getPage = (req, res) => {
    const { category, type } = req.params;
    if (type === "page") {
        console.log(category);
        Page.findOne({ category: category })
            .exec((error, page) => {
                if (error) return res.status(400).json({ error });
                if (page) return res.status(200).json({ page });
            });
    }
    else return res.status(400).json({ error: 'wtf' });
}
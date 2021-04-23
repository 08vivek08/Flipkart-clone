const Category = require('../models/category');
const Product = require('../models/product');

const get_ip = require('ipware')().get_ip;


function createCategories(categories, parentId = null) {
    let categoryList = [];
    let category;
    if (parentId == null) {
        category = categories.filter(cat => cat.parentId == undefined);
    }
    else {
        category = categories.filter(cat => cat.parentId == parentId);
    }
    for (let cate of category) {
        categoryList.push({
            _id: cate.id,
            name: cate.name,
            slug: cate.slug,
            categoryImage: cate.categoryImage,
            parentId: cate.parentId,
            type: cate.type,
            children: createCategories(categories, cate._id)
        });
    }
    return categoryList;
};

exports.initialData = async (req, res) => {
    // console.log('cookies', req.cookies);
    const ip_info = get_ip(req);
    let ipAddress = req.connection.remoteAddress, frwdIps;
    let frwdIpsstr = req.header('x-forwarded-for');
    if (frwdIpsstr) {
        frwdIps = frwdIpsstr.split(',');
    }

    const categories = await Category.find({}).exec();
    const products = await Product.find({})
        .populate({ path: 'category', select: '_id name' })
        .exec();
    return res.status(200).json({
        categoryList: createCategories(categories),
        productList: products.map((product) => product),
        ip: [ip_info, ipAddress, frwdIps]
    });
}
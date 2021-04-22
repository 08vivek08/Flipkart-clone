const slugify = require("slugify");
const Category = require("../models/category");

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
            type: cate.type,
            categoryImage: cate.categoryImage,
            parentId: cate.parentId,
            children: createCategories(categories, cate._id)
        });
    }
    return categoryList;
};

exports.addCategory = (req, res) => {
    const categoryObj = {
        name: req.body.name,
    }
    if (req.body.parentId) {
        categoryObj.parentId = req.body.parentId;
        categoryObj.slug = `${slugify(req.body.name)}-${categoryObj.parentId}`
    }
    else {
        categoryObj.slug = `${slugify(req.body.name)}-parent`
    }
    if (req.file) {
        categoryObj.categoryImage = process.env.API + 'public/' + req.file.filename;
    }
    else if (req.body.categoryImageUrl) {
        categoryObj.categoryImage = req.body.categoryImageUrl
    }
    const cat = new Category(categoryObj);
    cat.save((error, category) => {
        if (error) { return res.status(400).json({ error }); }
        if (category) {
            return res.status(201).json({ category });
        }
    });
}

exports.getCategory = (req, res) => {
    Category.find({})
        .exec((error, categories) => {
            if (error) { return res.status(400).json({ error }); }
            if (categories) {
                const categoryList = createCategories(categories);
                return res.status(200).json({ categoryList });
            }
        });
}

exports.updateCategories = async (req, res) => {
    const { _id, name, parentId, type } = req.body;
    let categoryImages = [];
    console.log(req.file);
    console.log(req.files);
    // // if(req.file)
    // if (req.files && req.files.length > 0) {
    //     categoryImages = req.files.map((f) => { return { categoryImage: process.env.API + 'public/' + f.filename } });
    // }
    const updatedCategories = []
    if (_id instanceof Array) {
        for (let i = 0; i < _id.length; i++) {
            const category = {
                name: name[i],
                type: type[i],
                ...categoryImages[i]
            };
            if (parentId[i]) {
                category.parentId = parentId[i];
            }
            const updatedCategory = await Category.findByIdAndUpdate({ _id: _id[i] }, category, { new: true });
            updatedCategories.push(updatedCategory)
        }
        return res.status(201).json({
            updatedCategories
        });
    }
    else {
        const category = {
            name,
            type,
            ...categoryImages[0]
        };
        if (parentId) {
            category.parentId = parentId;
        }
        const updatedCategory = await Category.findByIdAndUpdate({ _id }, category, { new: true });
        return res.status(201).json({ updatedCategory });
    }
}
exports.deleteCategories = async (req, res) => {
    const { ids } = req.body.payload;
    const deletedCategories = [];
    for (let i = ids.length - 1; i >= 0; i--) {
        console.log(ids[i]._id);
        const deleteCategory = await Category.findByIdAndDelete(ids[i]._id);
        deletedCategories.push(deleteCategory);
    }
    if (deletedCategories.length === ids.length) {
        return res.status(200).json(deletedCategories);
    }
}
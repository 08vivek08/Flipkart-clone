const express = require("express");
const router = express.Router();
const { addCategory, getCategory, updateCategories, deleteCategories } = require("../controllers/category");
const { requireSignin, adminMiddleware } = require("../common-middleware/index");
const upload = require('../common-middleware/upload');

router.post('/category/create', requireSignin, adminMiddleware, upload.single('categoryImage'), addCategory);
router.get('/category/getCategory', getCategory);
router.put('/category/update', requireSignin, adminMiddleware, upload.array('categoryImage'), updateCategories);
router.post('/category/delete', requireSignin, adminMiddleware, deleteCategories);




module.exports = router;
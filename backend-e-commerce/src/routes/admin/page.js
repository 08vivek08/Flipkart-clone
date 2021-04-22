const express = require("express");
const router = express.Router();
const { createPage, getPage } = require("../../controllers/page");
const { requireSignin, adminMiddleware } = require("../../common-middleware");
const upload = require('../../common-middleware/upload');

router.post('/page/create', requireSignin, adminMiddleware, upload.fields([
    { name: 'banners' },
    { name: 'products' }
]), createPage);

router.get('/page/:category/:type', getPage);


module.exports = router;
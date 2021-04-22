const express = require("express");
const router = express.Router();
const { initialData } = require("../../controllers/initialData");
const { requireSignin } = require("../../common-middleware");


router.get('/initialdata', requireSignin, initialData);
module.exports = router;
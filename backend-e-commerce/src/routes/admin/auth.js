const express = require("express");
const router = express.Router();
const { signup, signin, signout } = require("../../controllers/auth");
const { validateSignupRequest, validateSigninRequest, isRequestValidated, reqAdmin } = require("../../validators/auth");
const { requireSignin } = require("../../common-middleware");



router.post('/admin/signin', validateSigninRequest, isRequestValidated, reqAdmin, signin);
router.post('/admin/signup', validateSignupRequest, isRequestValidated, reqAdmin, signup);
router.post('/admin/signout', requireSignin, signout);
module.exports = router;
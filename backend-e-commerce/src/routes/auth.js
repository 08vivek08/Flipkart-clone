const express = require("express");
const router = express.Router();
const { signup, signin, signout } = require("../controllers/auth");
const { validateSignupRequest, validateSigninRequest, isRequestValidated, reqUser } = require("../validators/auth");
const { requireSignin } = require("../common-middleware");

router.post('/signin', validateSigninRequest, isRequestValidated, reqUser, signin);
router.post('/signup', validateSignupRequest, isRequestValidated, reqUser, signup);
router.post('/signout', requireSignin, signout);

module.exports = router;
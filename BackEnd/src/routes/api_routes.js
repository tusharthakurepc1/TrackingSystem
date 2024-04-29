const express = require("express")
const LoginOrganizationUser = require("../controller/LoginOrganizationUser")
const SignupOrganizationUser = require("../controller/SignupOrganizationUser");
const SignupOrganization = require("../controller/SignupOrganization");
const SendMailRequest = require("../controller/SendMailRequest")

const router = express.Router()

//Organization Users
router.post("/user-login", LoginOrganizationUser);
router.post("/user-signup", SignupOrganizationUser);

//Organization 
router.post("/org-signup", SignupOrganization)


router.post("/mail", SendMailRequest)





module.exports = router;
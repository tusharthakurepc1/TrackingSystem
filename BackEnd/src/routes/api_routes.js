const express = require("express")
const LoginOrganizationUser = require("../controller/LoginOrganizationUser")
const SignupOrganizationUser = require("../controller/SignupOrganizationUser");
const SignupOrganization = require("../controller/SignupOrganization");
const SendMailRequest = require("../controller/SendMailRequest")
const SignupSystemUser = require("../controller/SignupSystemUser")
const LoginSystemUser = require("../controller/LoginSystemUser")
const DashBoardSystemUser = require("../controller/DashBoardSystemUser");
const DashBoardOrganizationUser = require('../controller/DashBoardOrganizationUser')
const DeleteOrganizationUser = require("../controller/DeleteOrganizationUser")
const WFHApplication = require("../controller/WFH_Application");
const MakeAdmin = require("../controller/MakeAdmin")
const GetAdmin = require("../controller/GetAdmin")
const UpdateWFH_Application = require("../controller/UpdateWFH_Application");
const Auth = require("../controller/Auth");
const GetOrganizationUser = require("../controller/GetOrganizationUser");
const GetSystemUser = require("../controller/GetSystemUser");

const router = express.Router()

//System User
router.post("/sysuser-signup", SignupSystemUser);
router.post("/sysuser-login", LoginSystemUser);
router.post("/sysuser-dashboard",Auth , DashBoardSystemUser);
router.post("/sysuser-profile", Auth, GetSystemUser)


//Organization Users
router.post("/user-login", LoginOrganizationUser);
router.post("/user-signup", SignupOrganizationUser);
router.post("/user-dashboard", Auth, DashBoardOrganizationUser);
router.post('/user-delete', DeleteOrganizationUser)
router.post("/user-profile", Auth, GetOrganizationUser)
// router.post("/user-update", UserUpdate);

//Organization 
router.post("/org-signup", SignupOrganization)
router.post("/org-admin", MakeAdmin)
router.post("/org-getadmin", GetAdmin)

//Utility Route
router.post("/mail", SendMailRequest)
router.post('/application', Auth, WFHApplication)
router.post('/application-status', UpdateWFH_Application)

module.exports = router;
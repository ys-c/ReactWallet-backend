const{
    createUser,
    login,
    refreshAccessToken,
    verifyUserAuth,
    logout,
    
} = require("../controllers/user");

const router = require("express").Router();


router.post("/",createUser);
router.get("/verifyUser",verifyUserAuth);
router.post("/login",login);
router.post("/refreshAccessToken",refreshAccessToken);
router.post("/logout",logout);


module.exports = router;
const { register, login, getUser } = require('../Controller/userController')
const router = require("express").Router();
const fetchuser = require('../Middleware/userCredential')

router.post("/register", register);
router.post("/login", login);
router.post("/getuser", fetchuser, getUser);

module.exports = router;
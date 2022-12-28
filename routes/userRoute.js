const express = require("express");
const { registerUser, loginUser, logout, getUser } = require("../controllers/userControllers");
const { protect } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post('/register',registerUser);
router.post('/login',loginUser);
router.get('/logout',logout);
router.get('/getuser',protect ,getUser);

//a protector
module.exports=router;
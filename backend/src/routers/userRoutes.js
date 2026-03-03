const express = require('express');
const router = express.Router();
const userControl = require("../controllers/userControllers");

router.get("/", userControl.userDetails);
router.get("/find/:id", userControl.userFind);
router.post("/store",userControl.userStore);
router.put("/update/:id", userControl.userUpdate);
router.delete("/delete/:id",userControl.userDelete);

module.exports = router;
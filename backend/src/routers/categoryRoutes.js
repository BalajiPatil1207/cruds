const express = require('express');
const router = express.Router();
const catControl = require("../controllers/categoryController");

router.get("/", catControl.categoryDetails );
router.get("/find/:id", catControl.categoryFind );
router.post("/store", catControl.categoryStore );
router.put("/update/:id", catControl.categoryUpdate );
router.delete("/delete/:id", catControl.categoryDelete );

module.exports = router;
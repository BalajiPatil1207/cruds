const express = require('express');
const router = express.Router();
const productControl = require("../controllers/productController");

router.get("/", productControl.allProduct);
router.get("/find/:id", productControl.findProduct);
router.post("/create", productControl.createProduct);
router.put("/update/:id", productControl.updateProduct);
router.delete("/delete/:id", productControl.deleteProduct);

module.exports = router;
const express = require('express');
const router = express.Router();
const empControl = require("../controllers/empControllers");

router.get("/", empControl.allEmployee);
router.get("/find/:id", empControl.findEmployee);
router.post("/create", empControl.createEmployee);
router.put("/update/:id", empControl.updateEmployee);
router.delete("/delete/:id", empControl.deleteEmployee);

module.exports = router;
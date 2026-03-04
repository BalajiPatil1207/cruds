const express = require('express');
const router = express.Router();
const incomeControl = require("../controllers/incomeController");

router.get("/", incomeControl.allIncome);
router.get("/find/:id", incomeControl.findIncome);
router.post("/create", incomeControl.createIncome);
router.put("/update/:id", incomeControl.updateIncome);
router.delete("/delete/:id", incomeControl.deleteIncome);

module.exports = router;
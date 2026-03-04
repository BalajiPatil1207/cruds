const express = require('express');
const router = express.Router();
const expenseControl = require("../controllers/expenseController");

router.get("/", expenseControl.allExpense);
router.get("/find/:id", expenseControl.findExpense);
router.post("/create", expenseControl.createExpense);
router.put("/update/:id", expenseControl.updateExpense);
router.delete("/delete/:id", expenseControl.deleteExpense);

module.exports = router;
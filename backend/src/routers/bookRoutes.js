const express = require('express');
const router = express.Router();
const bookControl = require("../controllers/bookController");

router.get("/", bookControl.bookDetails );
router.get("/find/:id", bookControl.bookFind );
router.post("/store", bookControl.bookStore );
router.put("/update/:id", bookControl.bookUpdate );
router.delete("/delete/:id", bookControl.bookDelete );

module.exports = router;
const express = require('express');
const router = express.Router();
const studControl = require("../controllers/studController");

router.get("/", studControl.studIndex);
router.get("/stud/:id", studControl.studFind);
router.post("/store", studControl.studStore);
router.put("/update/:id", studControl.studUpdate);
router.delete("/delete/:id", studControl.studDelete);

module.exports = router;
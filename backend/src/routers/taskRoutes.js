const express = require('express');
const router = express.Router();
const taskControl = require("../controllers/taskControllers");

router.get("/", taskControl.taskDetails);
router.get("/find/:id", taskControl.taskFind);
router.post("/store", taskControl.taskStore);
router.put("/update/:id", taskControl.taskUpdate);
router.delete("/delete/:id", taskControl.taskDelete);

module.exports = router;
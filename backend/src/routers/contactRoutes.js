const express = require('express');
const router = express.Router();
const contactControl = require("../controllers/contactController");

router.get("/", contactControl.contactDetails  );
router.get("/find/:id", contactControl.contactFind  );
router.post("/store", contactControl.contactStore  );
router.put("/update/:id", contactControl.contactUpdate  );
router.delete("/delete/:id", contactControl.contactDelete  );

module.exports = router;
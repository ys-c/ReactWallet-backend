const router = require("express").Router();

router.use("/transaction_item", require("./transaction_item"));

module.exports = router;
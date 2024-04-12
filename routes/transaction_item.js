const{
    getAllTransactionItem,
    createTransactionItem,
    updateTransactionItemById,
    deleteTransactionItembyId,
    getTotalBalance,
    getTransactionItemById,
} = require("../controllers/transaction_item");

const router = require("express").Router();

router.get("/",getAllTransactionItem);
router.post("/",createTransactionItem);
router.put("/:id",updateTransactionItemById);
router.delete("/:id",deleteTransactionItembyId);
router.get("/balance",getTotalBalance);
router.get("/:id",getTransactionItemById);

module.exports = router;
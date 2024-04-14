const{
    getAllTransactionItem,
    createTransactionItem,
    updateTransactionItemById,
    deleteTransactionItembyId,
    getTotalBalance,
    getAllCategoryExpenses,
    getTransactionItemById,
} = require("../controllers/transaction_item");

const router = require("express").Router();

router.get("/",getAllTransactionItem);
router.get("/balance",getTotalBalance);
router.get("/categoryexp",getAllCategoryExpenses);
router.get("/:id",getTransactionItemById);
router.post("/",createTransactionItem);
router.put("/:id",updateTransactionItemById);
router.delete("/:id",deleteTransactionItembyId);

module.exports = router;
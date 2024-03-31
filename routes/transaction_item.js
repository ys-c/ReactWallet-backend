const{
    getAllTransactionItem,
    createTransactionItem,
    updateTransactionItemById,
    deleteTransactionItembyId,
} = require("../controllers/transaction_item");

const router = require("express").Router();

router.get("/",getAllTransactionItem);
router.post("/",createTransactionItem);
router.put("/:id",updateTransactionItemById);
router.delete("/:id",deleteTransactionItembyId);

module.exports = router;
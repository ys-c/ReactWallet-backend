const TransactionItem = require("../models/transaction_item");


exports.getAllTransactionItem = async (req, res) => {
    try {
        const transactionItem = await TransactionItem.findAll();
        if (transactionItem.length === 0) {
            res.status(404).json({ message: "There are currently no transactions" });
        }
        else {
            res.status(200).json(transactionItem);
        }

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createTransactionItem = async (req, res) => {
    try {
        await TransactionItem.create(req.body).then(function (TransactionItem) {
            res.status(200).json({ message: "success" });
        })

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.updateTransactionItemById = async (req, res) => {
    try {
        const transactionItem = await TransactionItem.findOne({ where: { transaction_id: req.params.id }, });
        if (transactionItem === null) {
            res.status(404).json({ message: "transaction item not found" })
        }
        else {
            transactionItem.set(req.body);
            transactionItem.save();
            res.status(200).json({ message: "success" });
        }

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.deleteTransactionItembyId = async (req, res) => {
    console.log("deleting ");
    try {
        const transactionItem = await TransactionItem.destroy({ where: { transaction_id: req.params.id }, });
        res.status(200).json({ message: "success" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



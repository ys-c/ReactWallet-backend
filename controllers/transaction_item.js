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
        await TransactionItem.create(req.body).then(function (transactionItem) {
            console.log("item:"+ transactionItem)
            res.status(200).json({ message: "success" });
        })

    } catch (error) {
        console.log(error.message);
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
    try {
        const transactionItem = await TransactionItem.destroy({ where: { transaction_id: req.params.id }, });
        res.status(200).json({ message: "success" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getTotalBalance = async(req, res) => {
    try{
        var balanceAmount=0;
        const transactionItem = await TransactionItem.findAll();
        if(transactionItem.length === 0)
        {
            res.status(200).json(balanceAmount);

        }
        else
        {
            let expenses =0;
            let income =0;
            const expenseTransactionItem = await TransactionItem.findAll({ where: { type: 'expenses' }});
            const incomeTransactionItem = await TransactionItem.findAll({ where: { type: 'income' }});
            expenseTransactionItem.forEach(item => {
                expenses += item.amount;
            });
            incomeTransactionItem.forEach(item => {
                income += item.amount;
            }); 
            balanceAmount = income - expenses;
            balanceAmount=balanceAmount.toFixed(2);
            res.status(200).json(balanceAmount);
        }
        

    }catch (error) {
        res.status(500).json({ message: error.message });
    }

}

exports.getTransactionItemById = async(req,res) => {
    try {
        const transactionItem = await TransactionItem.findOne({ where: { transaction_id: req.params.id }, });
        if (transactionItem === null) {
            res.status(404).json({ message: "transaction item not found" })
        }
        else {
            res.status(200).json(transactionItem);
        }

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
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
            // console.log("item:" + transactionItem)
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

exports.getTotalBalance = async (req, res) => {
    try {
        let balanceAmount = 0;
        const transactionItem = await TransactionItem.findAll();
        if (transactionItem.length === 0) {
            res.status(200).json(balanceAmount);

        }
        else {
            let expensesValue = 0;
            let incomeValue = 0;
            const expenseTransactionItem = await TransactionItem.findAll({ where: { type: 'expenses' } });
            const incomeTransactionItem = await TransactionItem.findAll({ where: { type: 'income' } });
            expenseTransactionItem.forEach(item => {
                expensesValue += item.amount;
            });
            incomeTransactionItem.forEach(item => {
                incomeValue += item.amount;
            });
            balanceAmount = incomeValue - expensesValue;
            balanceAmount = balanceAmount.toFixed(2);
            res.status(200).json(balanceAmount);
        }


    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}

exports.getTransactionItemById = async (req, res) => {
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

exports.getAllCategoryExpenses = async (req, res) => {
    try {
        const allExpensesItem = await TransactionItem.findAll({ where: { type: 'expenses' } });
        console.log(typeof (allExpensesItem));
        if (allExpensesItem.length === 0) {
            res.status(200).json("0");

        }
        else {
            let totalCategoryExpenses = [];
            // count all and get list of all the distinct category under expense that exist
            const uniqueCategory = [...new Set(allExpensesItem.map(item => item.category))];
            console.log(uniqueCategory);
            uniqueCategory.forEach(categoryVariable => {
                // using the list get the category and each total expenses
                let expensesByCategory = allExpensesItem.filter((item) => {
                    return item.category === categoryVariable;
                })
                var expensesValue =0;
                expensesByCategory.forEach(item =>{
                    expensesValue += item.amount;
                })
               var category = categoryVariable;
               var amount = expensesValue;
               var newItem = { category, amount};
               totalCategoryExpenses.push(newItem);

            });
            console.log(totalCategoryExpenses);
            // send the in json format the category name and the amount
            res.status(200).json(totalCategoryExpenses);
        }


    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
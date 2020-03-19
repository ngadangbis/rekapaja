const Expense = require("../models/expense.models.js");
const Type = require("../models/type.models.js");

const createExpense = async (req, res) => {
  console.log(req.body);
  const expenses = new Expense();
  expenses.type = req.body.type;
  expenses.date = req.body.date;
  expenses.total = req.body.total;
  expenses.description = req.body.description;
  expenses
    .save()
    .then(result => {
      Type.findOne({ type: expenses.type }, (err, type) => {
        if (type) {
          type.content.push(expenses);
          type.save();
          res.render("success");
        }
      });
    })
    .catch(error => {
      res.status(500).json({ error });
    });
};

const createExpenseDebit = async (req, res) => {
  console.log(req.body);
  const expenses = new Expense();
  expenses.type = "Debit";
  expenses.date = req.body.dates;
  expenses.total = req.body.total;
  expenses.description = req.body.description;
  expenses
    .save()
    .then(result => {
      Type.findOne({ type: expenses.type }, (err, type) => {
        if (type) {
          type.content.push(expenses);
          type.save();
          res.render("success");
        }
      });
    })
    .catch(error => {
      res.status(500).json({ error });
    });
};

const createExpenseCredit = async (req, res) => {
  console.log(req.body);
  const expenses = new Expense();
  expenses.type = "Credit";
  expenses.date = req.body.dates;
  expenses.total = req.body.total;
  expenses.description = req.body.description;
  expenses
    .save()
    .then(result => {
      Type.findOne({ type: expenses.type }, (err, type) => {
        if (type) {
          type.content.push(expenses);
          type.save();
          res.render("success");
        }
      });
    })
    .catch(error => {
      res.status(500).json({ error });
    });
};
module.exports = {
  createExpense,
  createExpenseDebit,
  createExpenseCredit
};

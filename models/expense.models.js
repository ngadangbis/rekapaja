const mongoose = require("mongoose");

const expenseSchema = mongoose.Schema(
  {
    type: { type: String, required: true }, //relation key
    date: String,
    total: Number,
    description: String
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Expense", expenseSchema);

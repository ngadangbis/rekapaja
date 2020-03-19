const mongoose = require("mongoose");

const typeSchema = mongoose.Schema(
  {
    type: { type: String, unique: true },
    content: [{ type: mongoose.Schema.Types.ObjectId, ref: "Expense" }]
  },
  {
    timestamps: true
  }
);
module.exports = mongoose.model("Type", typeSchema);

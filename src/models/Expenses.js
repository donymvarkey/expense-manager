const mongoose = require("mongoose");
const opts = { toJSON: { virtuals: true } };

const ExpenseSchema = new mongoose.Schema(
  {
    amount: { type: Number, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    month: { type: String, required: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      //   ref: "User",
      //   autopopulate: true,
      required: true,
    },
  },
  { timestamps: true },
  opts
);

// ExpenseSchema.plugin(require("mongoose-autopopulate"));
module.exports = mongoose.model("Expense", ExpenseSchema);

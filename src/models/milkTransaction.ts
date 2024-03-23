import mongoose , { Document} from "mongoose";
  
const milkTransactionSchema = new mongoose.Schema(
	{
		participants: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "User",
			},
		],
		transactions: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Transaction",
				default: [],
			},
		],
	},
	{ timestamps: true }
);

const MilkTransaction = mongoose.models.MilkTransaction || mongoose.model("MilkTransaction", milkTransactionSchema);

export default MilkTransaction;

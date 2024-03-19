import mongoose , { Document} from "mongoose";

interface MilkTransaction extends Document {
    participants: mongoose.Types.ObjectId[];
    transactions: mongoose.Types.ObjectId[];
}
  
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

const MilkTransaction = mongoose.model("MilkTransaction", milkTransactionSchema);

export default MilkTransaction;

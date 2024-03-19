import mongoose , { Document} from "mongoose";

export interface Transaction extends Document {
  farmerId: mongoose.Schema.Types.ObjectId;
  managerId: mongoose.Schema.Types.ObjectId;
  quantity: number;
  fat: number;
  snf: number;
  cost: number;
  paymentStatus: PaymentStatus;
}

export enum PaymentStatus {
  Pending = "pending",
  Done = "done",
}


const transactionSchema = new mongoose.Schema(
  {
    farmerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    managerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    quantity: { 
		type: Number, 
		required: true 
	},
    fat: { 
		type: Number, 
		required: true 
	},
    snf: { 
		type: Number, 
		required: true 
	},
    cost: { 
		type: Number, 
		required: true 
	},
    paymentStatus: {
      type: String,
      enum: Object.values(PaymentStatus),
      required: true,
    },
  },
  { timestamps: true }
);

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;

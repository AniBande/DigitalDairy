import mongoose from "mongoose";
 

  const transactionSchema = new mongoose.Schema({
    farmerId: {
        type: String, //mongoose.Schema.Types.ObjectId,
        //ref: "User",
       // required: true,
      },
      managerId: {
        type: String, //mongoose.Schema.Types.ObjectId,
       // ref: "User",
       // required: true,
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
        required: true,
        enum: ["Done","Pending"],
      },
   
    verifyToken: String,
    verifyTokenExpiry: Date,
},
{ timestamps: true }
);

const Transaction = mongoose.models.Transaction || mongoose.model("Transaction", transactionSchema);

export default Transaction;
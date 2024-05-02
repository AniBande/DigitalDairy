import mongoose from "mongoose";
 

  const machineLSchema = new mongoose.Schema({
    ph: {
        type: Number, 
        required: true,
      },
      temperature: {
        type: Number, 
        required: true,
      },
      taste: {
        type: Number, 
        required: true,
      },
      odor: {
        type: Number, 
        required: true,
      },
      fat: {
        type: Number, 
        required: true,
      },
      turbidity: {
        type: Number, 
        required: true,
      },
      
      color: {
        type: Number,
        required: true,
    
      },
   
    verifyToken: String,
    verifyTokenExpiry: Date,
},
{ timestamps: true }
);

const MachineL = mongoose.models.MachineL || mongoose.model("MachineL", machineLSchema);

export default MachineL;
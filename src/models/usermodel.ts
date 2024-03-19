import mongoose , { Document} from "mongoose";

export interface User extends Document {
    fullName: string;
    username: string;
    password: string;
    contactNumber: string;
    role: UserRole;
    isVerified: boolean;
    isAdmin: boolean;
  }
  
  export enum UserRole {
    Farmer = "farmer",
    DairyManager = "dairyManager",
  }

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide a username"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Please provide a email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
  },
  contactNumber: {
    type: String,
    required: [true, "Please provide a contact number"],
    validate: {
        validator: function(v: string) {
            return /^\d{10}$/.test(v);
        },
        message: (props: { value: any; }) => `${props.value} is not a valid phone number!`
    }
  },
  role: {
    type: String,
    enum: Object.values(UserRole),
    required: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  verifyToken: String,
  verifyTokenExpiry: Date,
}, { timestamps: true });

const User = mongoose.models.users || mongoose.model("User", userSchema);

export default User;

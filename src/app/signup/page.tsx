"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import RoleCheckbox from "../components/roleCheckbox";

// Signup page
export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
    contactNumber: "",
    role: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleCheckboxChange = (role: string) => {
    setUser({ ...user, role });
  };

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("Signup success", response.data);
      router.push("/login");
    } catch (error: any) {
      console.log("Signup failed", error.message);

      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex min-h-screen items-center justify-center px-6 py-12 lg:px-8 bg-white">
      <img
        src="https://images.pexels.com/photos/254178/pexels-photo-254178.jpeg?cs=srgb&dl=pexels-andrey-niqi-254178.jpg&fm=jpg"
        alt="bg-image"
        className="absolute inset-0 w-full h-full object-cover "
      />
      <div
        className="flex flex-col items-center justify-center w-full max-w-sm  rounded-lg shadow-lg p-8 relative opacity-90 backdrop-filter border border-gray-900
 backdrop-blur-lg"
      >
        <h1 className="text-white text-2xl mb-4">
          {loading ? "Processing" : "Signup"}
        </h1>
        <hr className="w-full border-gray-200 mb-4" />

        <label htmlFor="username" className="text-white">
          Username
        </label>
        <input
          className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black w-full"
          id="username"
          type="text"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          placeholder="Username"
        />

        <label htmlFor="email" className="text-white">
          Email
        </label>
        <input
          className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black w-full"
          id="email"
          type="text"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="Email"
        />

        <label htmlFor="password" className="text-white">
          Password
        </label>
        <input
          className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black w-full"
          id="password"
          type="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="Password"
        />

        <label htmlFor="contactNumber" className="text-white">
          Contact Number
        </label>
        <input
          className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black w-full"
          id="contactNumber"
          type="text"
          value={user.contactNumber}
          onChange={(e) => setUser({ ...user, contactNumber: e.target.value })}
          placeholder="contactNumber"
        />
        
        <div className="mb-3">
          <RoleCheckbox
            onCheckboxChange={handleCheckboxChange}
            selectedRole={user.role}
          />
        </div>
        

        <button
          onClick={onSignup}
          className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 bg-white text-black w-full hover:bg-blue-500"
        >
          {buttonDisabled ? "No Signup" : "Signup"}
        </button>

        <Link href="/login" className="text-white hover:underline">
          Visit Login page
        </Link>
      </div>
    </div>
  );
}

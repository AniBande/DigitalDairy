"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Input } from "@/components/ui/input"
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    username: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      // console.log("Login success", response.data);
      toast.success("Login success");
      router.push("/home");
    } catch (error: any) {
      // console.log("Login failed", error.message);
      // toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.username.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex min-h-screen items-center justify-center px-6 py-12 lg:px-8 bg-white">
      <Image
        src="/bg-image.jpg"
        alt="bg-image"
        width={900}
        height={900}
        className="absolute inset-0 w-full h-full object-cover "
      />
      <div
        className="flex flex-col items-center justify-center w-full max-w-sm  rounded-lg shadow-lg p-8 relative opacity-90 backdrop-filter border border-gray-900
 backdrop-blur-lg"
      >
        <h1 className="text-white text-2xl mb-4">
          {loading ? "Processing" : "Login"}
        </h1>
        <hr className="w-full border-gray-200 mb-4" />
        <label htmlFor="username" className="text-white">
          username
        </label>
        <Input
          id="username"
          type="text"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          placeholder="username"
        />
        <label htmlFor="password" className="text-white">
          password
        </label>
        <Input
          id="password"
          type="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="password"
        />
        <button
          onClick={onLogin}
          className="p-2 mt-4 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 bg-white text-black w-full hover:bg-blue-500"
        >
          Login here
        </button>
        <Link href="/signup" className="text-white hover:underline">
          Visit Signup page
        </Link>
      </div>
    </div>
  );
}

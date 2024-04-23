"use client";
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DialogClose } from "@radix-ui/react-dialog";

export function Profile() {
  const dialogCloseRef = useRef<HTMLButtonElement>(null);

  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
    newUsername:"",
    contactNumber: "",
    name: "",
    upiID: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const getUserDetails = async () => {
    try {
      const res = await axios.get("/api/users/me");
      setUser(res.data.data);
    } catch (error: any) {
      console.error("Error fetching user details:", error);
      toast.error(error.message);
    }
  };

  const saveChanges = async () => {
    try {
      setIsLoading(true);
      const res = await axios.post("/api/users/profileUpdate", user);
      toast.success("Profile updated successfully");
      dialogCloseRef.current?.click();
    } catch (error: any) {
      console.error("Error updating profile:", error);
      toast.error(error.response.data.error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <Dialog>
      <DialogTrigger asChild>
      <span className="cursor-pointer font-semibold">Edit Profile</span>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogClose ref={dialogCloseRef}/>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              placeholder={user.name ? "" : "Enter your full name"}
              defaultValue={user.name || ""}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="newUsername" className="text-right">
              Username
            </Label>
            <Input
              id="newUsername"
              // placeholder="Enter your full name"
              defaultValue={user.username}
              onChange={(e) => setUser({ ...user, newUsername: e.target.value })}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="contactNumber" className="text-right">
              Contact Number
            </Label>
            <Input
              id="contactNumber"
              defaultValue={user.contactNumber}
              onChange={(e) =>
                setUser({ ...user, contactNumber: e.target.value })
              }
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="upiid" className="text-right">
              UPI ID
            </Label>
            <Input
              id="upiid"
              placeholder={user.upiID ? "" : "Enter your full name"}
              defaultValue={user.upiID || ""}
              onChange={(e) => setUser({ ...user, upiID: e.target.value })}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" style={{ minWidth: "120px", minHeight: "40px" }} onClick={saveChanges}>
            {isLoading ? (
              <div className="w-5 h-5 border-t-2 border-b-2  rounded-full animate-spin" />
            ) : (
              "Save Changes"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

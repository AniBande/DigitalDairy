import { create } from "zustand";

export interface User {
    _id?: String
    username?: String,
    name?: String,
    upiID?: String,
    email?: String,
    contactNumber?: String,
    role?: String,
    verifyToken?: String,
    verifyTokenExpiry?: Date
}

type GetUser = {
	user: User;
	setUser: (soundEnabled: User) => void;
};

export const useGetUser = create<GetUser>((set) => ({
	user: {},
	setUser: (user: User) => set({ user }),
}));

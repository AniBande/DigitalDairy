"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
    const router = useRouter();
    useEffect(() => {
        const timeout = setTimeout(() => {
            router.push("/login");
        }, 1000); // 1000 milliseconds = 1 second

        // Cleanup function to clear the timeout if component unmounts before the delay
        return () => clearTimeout(timeout);
    }, []);
    return (
        <><h1>Loading...</h1></>
    );
}

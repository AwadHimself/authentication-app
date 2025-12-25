"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { removeToken, getToken } from "@/lib/api";
import { ProtectedLayout } from "@/components/ProtectedLayout";

export default function Dashboard() {
  const router = useRouter();
  const [name, setName] = useState("");

  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.push("/login");
    } else {
      const userName = localStorage.getItem("name") || "";
      setName(userName);
    }
  }, [router]);

  const handleLogout = () => {
    removeToken();
    toast.success("Logged out successfully");
    router.push("/login");
  };

  return (
    <ProtectedLayout>
      <div className="p-6 flex flex-col items-center gap-6">
        <h1 className="text-2xl font-bold">
          {name ? `Welcome, ${name}` : "Welcome"}
        </h1>
        <Button onClick={handleLogout}>Logout</Button>
      </div>
    </ProtectedLayout>
  );
}

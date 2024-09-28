"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { LuFrown } from "react-icons/lu";

export default function RdcPage() {
  const param = useParams();
  const router = useRouter();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);
    const timer = setTimeout(() => {
      router.push("/");
    }, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [param.role, router]);

  return (
    <div className="flex h-dvh items-center justify-center gap-4 text-muted-foreground">
      <LuFrown className="size-20" />
      <h1 className="max-w-xl text-3xl">
        You are not authorized to access this page. Redirecting to home page in{" "}
        {countdown} seconds...
      </h1>
    </div>
  );
}

'use client';
import React from "react";
import { Button } from "./ui/Button";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
const CloseModal = () => {
    const router = useRouter()
  return (
    <Button
      aria-label="Close-modal"
      variant="subtle"
      className="eounded-md h-8 w-8 p-0"
      onClick={() => router.back()}
    >
      <X className="w-4 h-4" />
    </Button>
  );
};

export default CloseModal;

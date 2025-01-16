"use client";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";

interface SubmitButtonProps {
  text: string;
  onClick?: () => void;
  variant?:
    | "link"
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | null
    | undefined;
}

export default function SubmitButtons({
  text,
  variant,
  onClick,
}: SubmitButtonProps) {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button onClick={onClick} type="submit" disabled>
          <Loader2 className="mr-2 w-5 h-5 animate-spin" />
          Saving
        </Button>
      ) : (
        <Button onClick={onClick} type="submit" variant={variant}>
          {text}
        </Button>
      )}
    </>
  );
}

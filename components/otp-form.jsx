"use client";

import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldDescription,
} from "@/components/ui/field";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { verifyAction } from "@/app/actions/auth";
import { useState } from "react";

export function OTPForm(props) {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsPending(true);

    const formData = new FormData(e.target);
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Please login first");
      router.push("/login");
      setIsPending(false);
      return;
    }

    formData.append("token", token);

    const res = await verifyAction(formData);

    if (!res.success) {
      toast.error(res.message);
      setIsPending(false);
      return;
    }

    toast.success("Email verified successfully!");
    router.push("/dashboard");
  };

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Enter verification code</CardTitle>
        <CardDescription>We sent a 6-digit code to your email</CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="otp">Verification Code</FieldLabel>

              <InputOTP maxLength={6} id="otp" name="otp">
                <InputOTPGroup className="gap-2.5 *:rounded-md *:border">
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>

              <FieldDescription>
                Enter the 6-digit code sent to your email
              </FieldDescription>
            </Field>

            <Field>
              <Button type="submit" disabled={isPending}>
                {isPending ? "Verifying..." : "Verify"}
              </Button>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}

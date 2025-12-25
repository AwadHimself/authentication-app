"use client";

import { useFormStatus } from "react-dom";
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
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { loginAction } from "@/app/actions/auth";
import Link from "next/link";
import { useState } from "react";

export function LoginForm(props) {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsPending(true);

    const formData = new FormData(e.target);
    const res = await loginAction(formData);

    if (!res.success) {
      toast.error(res.message);
      setIsPending(false);
      return;
    }

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("name", res.data.name);

    if (!res.data.email_verified_at) {
      toast("Please verify your email");
      router.push("/verify");
      return;
    }

    toast.success("Login successful");
    router.push("/dashboard");
  };

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Enter your credentials below</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input id="email" name="email" type="email" required />
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input id="password" name="password" type="password" required />
            </Field>
            <Field>
              <Button type="submit" disabled={isPending}>
                {isPending ? "Logging in..." : "Login"}
              </Button>
              <FieldDescription className="text-center">
                Don&apos;t have an account? <Link href="signup">Sign up</Link>
              </FieldDescription>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}

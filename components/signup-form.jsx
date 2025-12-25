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
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { registerAction } from "@/app/actions/auth";
import Link from "next/link";
import { useState } from "react";

function validatePassword(password) {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
  return regex.test(password);
}

export function SignupForm(props) {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsPending(true);

    const formData = new FormData(e.target);
    const password = formData.get("password");
    const confirm = formData.get("password_confirmation");

    if (!validatePassword(password)) {
      toast.error(
        "Password must contain uppercase, lowercase, number, and special character"
      );
      setIsPending(false);
      return;
    }

    if (password !== confirm) {
      toast.error("Passwords do not match");
      setIsPending(false);
      return;
    }

    const res = await registerAction(formData);

    if (!res.success) {
      toast.error(res.message);
      setIsPending(false);
      return;
    }

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("name", res.data.name);

    toast.success("Account created! Please verify your email.");
    router.push("/verify");
  };

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>Enter your info below</CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">Full Name</FieldLabel>
              <Input id="name" name="name" required />
            </Field>

            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input id="email" name="email" type="email" required />
            </Field>

            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input id="password" name="password" type="password" required />
            </Field>

            <Field>
              <FieldLabel htmlFor="password_confirmation">
                Confirm Password
              </FieldLabel>
              <Input
                id="password_confirmation"
                name="password_confirmation"
                type="password"
                required
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="mobile">Phone</FieldLabel>
              <Input id="mobile" name="mobile" required />
            </Field>

            <Field>
              <FieldLabel htmlFor="mobile_country_code">
                Country Code
              </FieldLabel>
              <Input
                id="mobile_country_code"
                name="mobile_country_code"
                required
              />
            </Field>

            <Field>
              <Button type="submit" disabled={isPending}>
                {isPending ? "Creating..." : "Create Account"}
              </Button>

              <FieldDescription className="text-center">
                Already have an account? <Link href="/login">Log In</Link>
              </FieldDescription>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}

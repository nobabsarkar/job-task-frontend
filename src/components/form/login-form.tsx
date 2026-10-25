"use client";

import Link from "next/link";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { useForm } from "@tanstack/react-form";
import { Button } from "../ui/button";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { LoginSchema } from "@/validation/auth.validation";
import { useLogin } from "@/hooks/auth.hook";
import { toast } from "../ui/toast";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const { mutate: login, isPending } = useLogin();

  const defaultValues = {
    email: "",
    password: "",
  };

  const form = useForm({
    defaultValues,

    validators: {
      onSubmit: LoginSchema,
    },

    onSubmit: async ({ value }) => {
      const loginData = {
        email: value.email,
        password: value.password,
      };

      login(loginData, {
        onSuccess: () => {
          toast.add({
            title: "Login Successfully",
            description: "Well Done",
            type: "success",
          });
          form.reset();

          router.push("/");
        },
        onError: (err) => {
          toast.add({
            title: "Authorization failure",
            description:
              err.message || "Something went wrong. Please try again",
          });
        },
      });
    },
  });

  return (
    <div className="flex flex-col gap-6 rounded-xl border bg-card p-6 shadow-lg">
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold tracking-tight">Login account</h1>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <FieldGroup>
          <form.Field name="email">
            {(field: any) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel
                    className={isInvalid ? "text-red-500" : ""}
                    htmlFor={field.name}
                  >
                    Email
                  </FieldLabel>

                  <div className="relative">
                    <Input
                      id={field.name}
                      name={field.name}
                      type="email"
                      placeholder="Email"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      className={
                        isInvalid
                          ? "!border-red-500 !ring-2 !ring-red-500/20 !outline-none focus-visible:!border-red-500 focus-visible:!ring-red-500/20"
                          : ""
                      }
                      autoComplete="off"
                    />
                  </div>

                  {isInvalid && (
                    <FieldError
                      className="text-red-500"
                      errors={field.state.meta.errors}
                    />
                  )}
                </Field>
              );
            }}
          </form.Field>

          <form.Field name="password">
            {(field: any) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel
                    className={isInvalid ? "text-red-500" : ""}
                    htmlFor={field.name}
                  >
                    Password
                  </FieldLabel>

                  <div className="relative">
                    <Input
                      id={field.name}
                      name={field.name}
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      className={
                        isInvalid
                          ? "!border-red-500 !ring-2 !ring-red-500/20 !outline-none focus-visible:!border-red-500 focus-visible:!ring-red-500/20"
                          : ""
                      }
                      autoComplete="off"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground focus:outline-none"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? (
                        <EyeOff className="size-4 cursor-pointer" />
                      ) : (
                        <Eye className="size-4 cursor-pointer" />
                      )}
                    </button>
                  </div>

                  {isInvalid && (
                    <FieldError
                      className="text-red-500"
                      errors={field.state.meta.errors}
                    />
                  )}
                </Field>
              );
            }}
          </form.Field>

          <Button className="cursor-pointer outline" type="submit">
            Login
          </Button>
        </FieldGroup>
      </form>

      <div className="text-center text-sm text-muted-foreground">
        Don't have an account?{" "}
        <Link
          href="/register"
          className=" font-medium text-primary hover:underline"
        >
          Register
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;

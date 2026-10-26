// "use client";

// import Link from "next/link";
// import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
// import { Input } from "../ui/input";
// import { useForm } from "@tanstack/react-form";
// import { Button } from "../ui/button";
// import { Eye, EyeOff } from "lucide-react";
// import { useState } from "react";
// import { LoginSchema } from "@/validation/auth.validation";
// import { useLogin } from "@/hooks/auth.hook";
// import { toast } from "../ui/toast";
// import { useRouter } from "next/navigation";

// const LoginForm = () => {
//   const router = useRouter();
//   const [showPassword, setShowPassword] = useState(false);

//   const { mutate: login, isPending } = useLogin();

//   const defaultValues = {
//     email: "",
//     password: "",
//   };

//   const form = useForm({
//     defaultValues,

//     validators: {
//       onSubmit: LoginSchema,
//     },

//     onSubmit: async ({ value }) => {
//       const loginData = {
//         email: value.email,
//         password: value.password,
//       };

//       login(loginData, {
//         onSuccess: () => {
//           toast.add({
//             title: "Login Successfully",
//             description: "Well Done",
//             type: "success",
//           });
//           form.reset();

//           router.push("/");
//         },
//         onError: (err) => {
//           toast.add({
//             title: "Authorization failure",
//             description:
//               err.message || "Something went wrong. Please try again",
//           });
//         },
//       });
//     },
//   });

//   return (
//     <div className="flex flex-col gap-6 rounded-xl  bg-card p-6 shadow-lg ">
//       <div className="flex flex-col items-center gap-2 text-center">
//         <h1 className="text-2xl font-bold tracking-tight">Login account</h1>
//       </div>

//       <form
//         onSubmit={(e) => {
//           e.preventDefault();
//           e.stopPropagation();
//           form.handleSubmit();
//         }}
//       >
//         <FieldGroup className="">
//           <form.Field name="email">
//             {(field: any) => {
//               const isInvalid =
//                 field.state.meta.isTouched && !field.state.meta.isValid;

//               return (
//                 <Field data-invalid={isInvalid}>
//                   <FieldLabel
//                     className={isInvalid ? "text-red-500" : ""}
//                     htmlFor={field.name}
//                   >
//                     Email
//                   </FieldLabel>

//                   <div className="relative">
//                     <Input
//                       id={field.name}
//                       name={field.name}
//                       type="email"
//                       placeholder="Email"
//                       value={field.state.value}
//                       onBlur={field.handleBlur}
//                       onChange={(e) => field.handleChange(e.target.value)}
//                       aria-invalid={isInvalid}
//                       className={
//                         isInvalid
//                           ? "!border-red-500 !ring-2 !ring-red-500/20 !outline-none focus-visible:!border-red-500 focus-visible:!ring-red-500/20"
//                           : ""
//                       }
//                       autoComplete="off"
//                     />
//                   </div>

//                   {isInvalid && (
//                     <FieldError
//                       className="text-red-500"
//                       errors={field.state.meta.errors}
//                     />
//                   )}
//                 </Field>
//               );
//             }}
//           </form.Field>

//           <form.Field name="password">
//             {(field: any) => {
//               const isInvalid =
//                 field.state.meta.isTouched && !field.state.meta.isValid;

//               return (
//                 <Field data-invalid={isInvalid}>
//                   <FieldLabel
//                     className={isInvalid ? "text-red-500" : ""}
//                     htmlFor={field.name}
//                   >
//                     Password
//                   </FieldLabel>

//                   <div className="relative">
//                     <Input
//                       id={field.name}
//                       name={field.name}
//                       type={showPassword ? "text" : "password"}
//                       placeholder="Password"
//                       value={field.state.value}
//                       onBlur={field.handleBlur}
//                       onChange={(e) => field.handleChange(e.target.value)}
//                       aria-invalid={isInvalid}
//                       className={
//                         isInvalid
//                           ? "!border-red-500 !ring-2 !ring-red-500/20 !outline-none focus-visible:!border-red-500 focus-visible:!ring-red-500/20"
//                           : ""
//                       }
//                       autoComplete="off"
//                     />

//                     <button
//                       type="button"
//                       onClick={() => setShowPassword(!showPassword)}
//                       className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground focus:outline-none"
//                       aria-label={
//                         showPassword ? "Hide password" : "Show password"
//                       }
//                     >
//                       {showPassword ? (
//                         <EyeOff className="size-4 cursor-pointer" />
//                       ) : (
//                         <Eye className="size-4 cursor-pointer" />
//                       )}
//                     </button>
//                   </div>

//                   {isInvalid && (
//                     <FieldError
//                       className="text-red-500"
//                       errors={field.state.meta.errors}
//                     />
//                   )}
//                 </Field>
//               );
//             }}
//           </form.Field>

//           <Button className="cursor-pointer outline" type="submit">
//             Login
//           </Button>
//         </FieldGroup>
//       </form>

//       <div className="text-center text-sm text-muted-foreground">
//         Don't have an account?{" "}
//         <Link
//           href="/register"
//           className=" font-medium text-primary hover:underline"
//         >
//           Register
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default LoginForm;

"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "@tanstack/react-form";
import { Eye, EyeOff, ShieldCheck, GraduationCap, Users } from "lucide-react";

import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toast } from "../ui/toast";

import { LoginSchema } from "@/validation/auth.validation";
import { useLogin } from "@/hooks/auth.hook";

const demoAccounts = {
  admin: {
    email: "superadmin@gmail.com",
    password: "123456",
  },
  student: {
    email: "nobab@gmail.com",
    password: "123456",
  },
  mentor: {
    email: "shanto@gmail.com",
    password: "123456",
  },
};

const LoginForm = () => {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const { mutate: login, isPending } = useLogin();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },

    validators: {
      onSubmit: LoginSchema,
    },

    onSubmit: async ({ value }) => {
      login(
        {
          email: value.email,
          password: value.password,
        },
        {
          onSuccess: () => {
            toast.add({
              title: "Login Successfully",
              description: "Welcome back!",
              type: "success",
            });

            form.reset();
            router.push("/");
          },
          onError: (err) => {
            const error = err as {
              message?: string;
              data?: {
                message?: string;
                error?: string;
              };
              response?: {
                _data?: {
                  message?: string;
                  error?: string;
                };
              };
            };

            const errorMessage =
              error.data?.message ||
              error.data?.error ||
              error.response?._data?.message ||
              error.response?._data?.error ||
              error.message ||
              "Something went wrong. Please try again.";

            toast.add({
              title: "Login Failed",
              description: errorMessage,
              type: "error",
            });
          },

          // onError: (err) => {
          //   toast.add({
          //     title: "Login Failed",
          //     description:
          //       err.message || "Something went wrong. Please try again.",
          //     type: "error",
          //   });
          // },
        },
      );
    },
  });

  const handleQuickFill = (role: keyof typeof demoAccounts) => {
    const account = demoAccounts[role];

    form.setFieldValue("email", account.email);
    form.setFieldValue("password", account.password);
  };

  const quickFillButtons = [
    {
      role: "admin" as const,
      label: "Admin",
      icon: ShieldCheck,
    },
    {
      role: "student" as const,
      label: "Student",
      icon: GraduationCap,
    },
    {
      role: "mentor" as const,
      label: "Mentor",
      icon: Users,
    },
  ];

  return (
    <div className="flex w-full flex-col gap-6 rounded-2xl border border-border/60 bg-card p-5 shadow-lg sm:p-7">
      {/* Header */}
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold tracking-tight">Welcome Back</h1>

        <p className="text-sm text-muted-foreground">
          Sign in to access your account
        </p>
      </div>

      {/* Quick-fill buttons */}
      <div className="space-y-3">
        <p className="text-center text-xs font-medium text-muted-foreground">
          Quick fill demo credentials
        </p>

        <div className="grid grid-cols-3 gap-2">
          {quickFillButtons.map(({ role, label, icon: Icon }) => (
            <Button
              key={role}
              type="button"
              variant="outline"
              disabled={isPending}
              onClick={() => handleQuickFill(role)}
              className="h-11 cursor-pointer gap-1.5 rounded-xl px-2 transition-colors hover:border-primary/50 hover:bg-primary/5"
            >
              <Icon className="size-4 shrink-0" />
              <span>{label}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-border" />
        </div>

        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-card px-3 text-muted-foreground">
            Or sign in manually
          </span>
        </div>
      </div>

      {/* Login form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <FieldGroup className="gap-5">
          {/* Email */}
          <form.Field name="email">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel
                    htmlFor={field.name}
                    className={isInvalid ? "text-red-500" : ""}
                  >
                    Email
                  </FieldLabel>

                  <Input
                    id={field.name}
                    name={field.name}
                    type="email"
                    placeholder="Enter your email"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    autoComplete="email"
                    className={
                      isInvalid ? "border-red-500 ring-2 ring-red-500/20" : ""
                    }
                  />

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

          {/* Password */}
          <form.Field name="password">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel
                    htmlFor={field.name}
                    className={isInvalid ? "text-red-500" : ""}
                  >
                    Password
                  </FieldLabel>

                  <div className="relative">
                    <Input
                      id={field.name}
                      name={field.name}
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      autoComplete="current-password"
                      className={`pr-11 ${
                        isInvalid ? "border-red-500 ring-2 ring-red-500/20" : ""
                      }`}
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword((previous) => !previous)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-muted-foreground transition-colors hover:text-foreground"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? (
                        <EyeOff className="size-4" />
                      ) : (
                        <Eye className="size-4" />
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

          {/* Submit button */}
          <Button
            className="h-11 w-full cursor-pointer rounded-xl font-semibold"
            type="submit"
            disabled={isPending}
          >
            {isPending ? "Signing in..." : "Login"}
          </Button>
        </FieldGroup>
      </form>

      {/* Register link */}
      <div className="text-center text-sm text-muted-foreground">
        Don't have an account?{" "}
        <Link
          href="/register"
          className="font-semibold text-primary hover:underline"
        >
          Register
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;

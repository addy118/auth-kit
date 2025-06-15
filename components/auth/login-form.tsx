"use client";

import React, { useEffect, useState, useTransition } from "react";
import * as z from "zod";
import { CardWrapper } from "./card-wrapper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@/schemas";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FormError } from "../form-error";
import { FormSuccess } from "@/components/form-success";
import { login } from "@/actions/login";
import { useRouter, useSearchParams } from "next/navigation";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import Link from "next/link";
import { FaExclamation } from "react-icons/fa";

export const LoginForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email already in use with different provider!"
      : "";

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [showTwoFactor, setShowTwoFactor] = useState<boolean>(false);
  const [twoFactorMail, setTwoFactorMail] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "addyyy118@gmail.com",
      // password: "12345678",
      password: "Hello@18",
    },
  });

  // useEffect(() => {
  //   if (error || success) {
  //     const timer = setTimeout(() => {
  //       setError(undefined);
  //       setSuccess(undefined);
  //     }, 3000);

  //     return () => clearTimeout(timer);
  //   }
  // }, [error, success]);

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("");
    setSuccess("");

    startTransition(async () => {
      try {
        const data = await login(values);
        if (!data) return;

        if (data?.error) {
          form.reset();
          setError(data?.error);
        }

        if (data?.success) {
          form.reset();
          setSuccess(data?.success);
        }

        if (data?.twoFactor) {
          setTwoFactorMail(values.email);
          setShowTwoFactor(true);
        } else if (data?.success) {
          router.push(DEFAULT_LOGIN_REDIRECT);
          // window.location.reload();
        }

        if (data?.twoFactor && data?.success) {
          router.push(DEFAULT_LOGIN_REDIRECT);
          // window.location.reload();
        }
      } catch {
        setError("Something went wrong");
      }
    });
  };

  return (
    <CardWrapper
      headerLablel="Welcome back!"
      backButtonLabel={
        !showTwoFactor ? "Don't have an account?" : "Create a new account?"
      }
      backButtonHref="/register"
      showSocial={!showTwoFactor}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            {/* 2fa inputs */}
            {showTwoFactor && (
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="leading-normal flex flex-col items-start">
                      The two factor authentication code has been sent to{" "}
                      {twoFactorMail}
                      <div className="flex items-center justify-center gap-2 text-gray-400 text-xs">
                        <FaExclamation size={12} />
                        <p>The 2FA code sent will expire in 5 minutes</p>
                      </div>
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="000000"
                        type="text"
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {/* normal login inputs */}
            {!showTwoFactor && (
              <>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="john.doe@example.com"
                          type="email"
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="*******"
                          type="password"
                          disabled={isPending}
                        />
                      </FormControl>
                      <Button
                        variant="link"
                        size="sm"
                        asChild
                        className="px-0 font-normal"
                      >
                        <Link href="/reset">Forgot Password?</Link>
                      </Button>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
          </div>

          <FormError message={error || urlError} />
          <FormSuccess message={success} />
          <Button type="submit" disabled={isPending} className="w-full">
            {!showTwoFactor ? "Login" : "Confirm"}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

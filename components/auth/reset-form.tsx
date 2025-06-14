"use client";

import React, { useState, useTransition } from "react";
import * as z from "zod";
import { CardWrapper } from "./card-wrapper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ResetSchema } from "@/schemas";
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
import { useRouter } from "next/navigation";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { reset } from "@/actions/reset";

export const ResetForm = () => {
  const router = useRouter();

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: "addyyy118@gmail.com",
    },
  });

  const onSubmit = (values: z.infer<typeof ResetSchema>) => {
    setError("");
    setSuccess("");

    console.log(values);

    startTransition(() => {
      reset(values).then((data) => {
        if (!data) return;

        setError(data?.error);
        setSuccess(data?.success);

        if (data?.success) {
          router.push(DEFAULT_LOGIN_REDIRECT);
        }
      });
    });
  };

  return (
    <CardWrapper
      headerLablel="Forgot your password?"
      backButtonLabel="Back to login"
      backButtonHref="/login"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
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
          </div>

          <FormError message={error} />
          <FormSuccess message={success} />
          <Button type="submit" disabled={isPending} className="w-full">
            Send reset email
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

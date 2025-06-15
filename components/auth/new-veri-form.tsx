"use client";
import React, { useCallback, useEffect, useState } from "react";
import { CardWrapper } from "./card-wrapper";
import { useSearchParams } from "next/navigation";
import { newVerification } from "@/actions/new-verification";
import { FormSuccess } from "../form-success";
import { FormError } from "../form-error";
import Loading from "../loading";

export const NewVerificationForm = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const onSubmit = useCallback(async () => {
    if (!token) {
      setError("Missing token.");
      return;
    }
    try {
      const data = await newVerification(token);

      if (data?.error) {
        setSuccess(undefined);
        setError(data.error);
      } else if (data?.success) {
        setError(undefined);
        setSuccess(data.success);
      }
    } catch {
      setError("Something went wrong.");
    }
  }, [token]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <CardWrapper
      headerLablel="Confirming your verification"
      backButtonHref="/login"
      backButtonLabel="Back to login"
    >
      <div className="flex items-center w-full justify-center">
        {!success && !error && <Loading action="" item="" size={10} />}
        <FormSuccess message={success} />
        <FormError message={error} />
      </div>
    </CardWrapper>
  );
};

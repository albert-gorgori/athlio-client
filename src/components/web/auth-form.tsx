"use client";
import React, { useState } from "react";
import Image from "next/image";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useTranslations } from "next-intl";
// import { useRouter } from "next/router";
import { SIGN_IN_ROUTE, SIGN_UP_ROUTE } from "@/lib/constants";
import { useRouter } from "next/navigation";
import { signUp } from "@/app/(auth)/actions";
import { signIn } from "@/app/(auth)/sign-in/actions";
import { AuthResult } from "@/types/userTypes";
import { authFormSchema } from "@/lib/utils";
import { Loader, LoaderCircle } from "lucide-react";



const AuthForm = ({ type }: { type: string }) => {
  const t = useTranslations();
  // const router = useRouter();
  const [user, setUser] = useState<AuthResult| null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const formSchema = authFormSchema(type)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    try {
      if (type === SIGN_UP_ROUTE) {
        const userData = {
          firstName: data.firstName,
          email: data.email,
          password: data.password,
        };
        const res = await signUp(userData);
        if (res.error) {
          throw new Error(res.error || "Failed to create user");
        }
        console.log("Signing up user:", userData);
        setUser(res);
      }

      if (type === SIGN_IN_ROUTE) {
        const response = await signIn({
          email: data.email,
          password: data.password,
        })
        if (response) {
          setUser(response);
          router.push("/");
        }
      }
    } catch (error) {
      console.error("Error during authentication:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-200 via-white px-4">
      <section className="auth-form w-full max-w-sm bg-background border rounded-lg p-6 shadow-sm">
      <h2 className="mb-6 text-2xl font-bold">
        {type === SIGN_IN_ROUTE
        ? t("AuthForm.signInTitle")
        : t("AuthForm.signUpTitle")}
      </h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {type === SIGN_UP_ROUTE && (
          <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
            <FormLabel>{t("AuthForm.usernameLabel")}</FormLabel>
            <FormControl>
              <Input
              placeholder={t("AuthForm.usernamePlaceholder")}
              {...field}
              />
            </FormControl>
            <FormMessage />
            </FormItem>
          )}
          />
        )}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
          <FormItem>
            <FormLabel>{t("AuthForm.emailLabel")}</FormLabel>
            <FormControl>
            <Input
              placeholder={t("AuthForm.emailPlaceholder")}
              {...field}
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
            <FormLabel>{t("AuthForm.passwordLabel")}</FormLabel>
            <FormControl>
            <Input
              type="password"
              placeholder={t("AuthForm.passwordPlaceholder")}
              {...field}
            />
            </FormControl>
            <FormMessage />
          </FormItem>
          )}
        />
        <div>
          <p className="text-sm text-muted-foreground">
          {type === SIGN_IN_ROUTE
            ? t("AuthForm.noAccountPrompt")
            : t("AuthForm.haveAccountPrompt")}{" "}
          <a
            href={type === SIGN_IN_ROUTE ? SIGN_UP_ROUTE : SIGN_IN_ROUTE}
            className="text-primary hover:underline"
          >
            {type === SIGN_IN_ROUTE
            ? t("AuthForm.submitButtonSignUp")
            : t("AuthForm.submitButtonSignIn")}
          </a>
          </p>
        </div>
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading && (
          <LoaderCircle
            className="mr-2 h-4 w-4 animate-spin"
            aria-hidden="true"
          />
          )}
          {type === SIGN_IN_ROUTE
          ? t("AuthForm.submitButtonSignIn")
          : t("AuthForm.submitButtonSignUp")}
        </Button>

        <div className="space-y-3">
          <div className="flex items-center">
          <div className="h-px flex-1 bg-border" />
          <span className="mx-2 text-xs text-muted-foreground uppercase tracking-wide">
            Or
          </span>
          <div className="h-px flex-1 bg-border" />
          </div>

          <Button
          type="button"
          aria-label="Continue with Strava"
          className="w-full bg-[#FC4C02] text-white hover:bg-[#e44502] inline-flex items-center justify-center gap-2"
          onClick={() => {
            window.location.assign("/api/auth/strava");
          }}
          >
          <Image
            src="/strava.svg"
            alt=""
            aria-hidden="true"
            width={20}
            height={20}
            className="h-5 w-5"
          />
          {t("AuthForm.continueWithStrava")}
          </Button>

          <p className="text-center text-xs text-muted-foreground">
          {t("AuthForm.signInOrSignUpWithStrava")}
          </p>
        </div>
        </form>
      </Form>
      </section>
    </div>
  );
};

export default AuthForm;

"use client";
// import { useTranslations } from 'next-intl';
import React from "react";
import Image from "next/image";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useTranslations } from "next-intl";

const formSchema = z.object({
  username: z.string().min(2).max(30),
  email: z.email().min(1).max(255),
  password: z.string().min(6),
});

export function ProfileForm() {}

const AuthForm = () => {
  const t = useTranslations();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <section className="auth-form">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("AuthForm.usernameLabel")}</FormLabel>
                <FormControl>
                  <Input placeholder={t("AuthForm.usernamePlaceholder")} {...field} />
                </FormControl>
                <FormDescription>
                  {t("AuthForm.usernameDescription")}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("AuthForm.emailLabel")}</FormLabel>
                <FormControl>
                  <Input placeholder={t("AuthForm.emailPlaceholder")} {...field} />
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
                  <Input placeholder={t("AuthForm.passwordPlaceholder")} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">{t("AuthForm.submitButtonSignIn")}</Button>

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
              <Image src="/strava.svg" alt="" aria-hidden="true" width={20} height={20} className="h-5 w-5" />
              {t("AuthForm.continueWithStrava")}
            </Button>

            <p className="text-center text-xs text-muted-foreground">
              {t("AuthForm.signInOrSignUpWithStrava")}
            </p>
          </div>
        </form>
      </Form>
    </section>
  );
};

export default AuthForm;

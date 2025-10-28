"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import React from "react";
import { useForm } from "react-hook-form";

type SupportFormValues = {
  name: string;
  email: string;
  subject: string;
  category: string;
  message: string;
  agree: boolean;
};

const page = () => {
  function SupportForm() {
    const form = useForm<SupportFormValues>({
      defaultValues: {
        name: "",
        email: "",
        subject: "",
        category: "",
        message: "",
        agree: false,
      },
      mode: "onSubmit",
    });
    const [submitting, setSubmitting] = React.useState(false);

    async function onSubmit(values: SupportFormValues) {
      if (!values.agree) {
        form.setError("agree", { message: "Please accept the terms." });
        return;
      }
      setSubmitting(true);
      try {
        // Replace with your API call
        await new Promise((r) => setTimeout(r, 800));
        form.reset();
        alert("Support request sent. We’ll get back to you shortly.");
      } finally {
        setSubmitting(false);
      }
    }

    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="name"
              rules={{ required: "Name is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              rules={{
                required: "Email is required",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Enter a valid email",
                },
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="you@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="subject"
            rules={{ required: "Subject is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Subject</FormLabel>
                <FormControl>
                  <Input placeholder="Briefly describe your issue" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            rules={{ required: "Please choose a category" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="billing">Billing</SelectItem>
                    <SelectItem value="technical">Technical issue</SelectItem>
                    <SelectItem value="account">Account</SelectItem>
                    <SelectItem value="feedback">Feedback</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            rules={{
              required: "Message is required",
              minLength: { value: 10, message: "Min 10 characters" },
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Message</FormLabel>
                <FormControl>
                  <Textarea
                    rows={6}
                    placeholder="Describe the issue in detail..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="agree"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start gap-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    I agree to be contacted about this request
                  </FormLabel>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end">
            <Button type="submit" disabled={submitting}>
              {submitting ? "Sending..." : "Send request"}
            </Button>
          </div>
        </form>
      </Form>
    );
  }

  return (
    <div className="container mx-auto max-w-2xl py-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Support</h1>
        <p className="text-sm text-muted-foreground">
          Submit a request and our team will get back to you.
        </p>
      </div>
      <div className="mt-6 rounded-lg border p-6">
        <SupportForm />
      </div>
    </div>
  );
};

export default page;

"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderIcon } from 'lucide-react';
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";

const formSchema = z.object({
  url: z
    .string()
    .url("Please enter a valid URL")
    .min(6, {
      message: "The X/Twitter URL is too short.",
    })
    .max(100, {
      message: "The X/Twitter URL is too long.",
    }),
});

interface ThreadInputFormProps {
  onSubmit: (url: string) => Promise<void>;
}

export function ThreadInputForm({ onSubmit }: ThreadInputFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: "",
    },
  });

  async function handleSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    await onSubmit(values.url);
    setIsLoading(false);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex w-full max-w-sm flex-col gap-4 sm:max-w-md sm:flex-row"
      >
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <Input
                  placeholder="Paste a Twitter thread URL..."
                  {...field}
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading && (
            <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />
          )}
          {isLoading ? "Generating..." : "Generate Snap"}
        </Button>
      </form>
    </Form>
  );
}


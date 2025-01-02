"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { LoaderIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { useThread } from "./thread-provider";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";

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

export function ThreadInputForm() {
  const { setThreadId } = useThread();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: "",
    },
  });

  async function handleSubmit(values: z.infer<typeof formSchema>) {
    console.log("Form submitted with:", values);
    setIsLoading(true);
    setThreadId(values.url);
    setIsLoading(false);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex w-full flex-col gap-4 sm:flex-row"
      >
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <div className="relative">
                  <Input
                    placeholder="https://x.com/RateDaveR/status/1873779825179320328"
                    {...field}
                    className="h-12 w-full bg-background px-4 text-foreground backdrop-blur-sm"
                  />
                  <motion.div
                    className="pointer-events-none absolute inset-0 rounded-md border border-primary/50"
                    animate={{
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            type="submit"
            disabled={isLoading}
            size="lg"
            className="h-12 w-full px-8 sm:w-auto"
          >
            {isLoading && <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />}
            {isLoading ? "Generating..." : "Generate Snap"}
          </Button>
        </motion.div>
      </form>
    </Form>
  );
}

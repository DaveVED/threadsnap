"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderIcon } from 'lucide-react';
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { motion } from "framer-motion";

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
        className="flex w-full flex-col gap-3 sm:flex-row sm:gap-4"
      >
        <FormField
          control={form.control}
          name="url"
          render={({ field }: { field: FieldValues }) => (
            <FormItem className="flex-1">
              <FormControl>
                <div className="relative">
                  <Input
                    placeholder="https://x.com/RateDaveR/status/1873779825179320328"
                    {...field}
                    className="h-10 w-full bg-background text-foreground px-3 py-2 text-sm backdrop-blur-sm sm:h-12 sm:px-4"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      console.log("Input changed:", e.target.value);
                      field.onChange(e);
                    }}
                  />
                  <motion.div
                    className="absolute inset-0 rounded-md border border-primary/50 pointer-events-none"
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
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button 
            type="submit" 
            disabled={isLoading} 
            size="lg" 
            className="h-10 w-full px-6 sm:h-12 sm:w-auto sm:px-8"
          >
            {isLoading && <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />}
            {isLoading ? "Generating..." : "Generate Snap"}
          </Button>
        </motion.div>
      </form>
    </Form>
  );
}


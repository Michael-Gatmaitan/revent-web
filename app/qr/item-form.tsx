"use client";
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

const formSchema = z.object({
  itemNumber: z.string().min(1, {
    message: "Item must have item number",
  }),
  itemName: z.string().min(3, {
    message: "Item must have item name",
  }),
  discount: z.number().min(1, {
    message: "Item must have discount at least 1",
  }),
  stock: z.number().min(1, {
    message: "Item must have stock at least 1",
  }),
  unitPrice: z.number().min(1, {
    message: "Item must have price",
  }),
  imageURL: z.string().min(3, {
    message: "Item must have its image",
  }),
  description: z
    .string()
    .min(1, {
      message: "optional",
    })
    .optional(),
});

const ItemForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      itemName: "",
      itemNumber: "",
      discount: 0,
      stock: 0,
      unitPrice: 0,
      imageURL: "",
      description: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <Form {...form}>
      <form></form>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="itemNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default ItemForm;

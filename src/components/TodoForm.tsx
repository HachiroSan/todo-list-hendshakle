'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { TodoType } from "@/types/todo";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { useTodo } from "@/contexts/TodoContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

/**
 * Why we use a form in TodoForm here:
 * 1. Data Validation: Using react-hook-form with Zod schema ensures all inputs are properly validated
 *    before submission, preventing invalid data from entering our todo list.
 * 2. Form State Management: The form hook manages the state of all inputs, their values, errors,
 *    and validation states in a centralized way, reducing complexity and potential bugs.
 * 3. Accessibility: HTML form provides built-in accessibility features like form controls,
 *    keyboard navigation, and proper labeling for screen readers.
 * 4. User Experience: Native form features like form reset, validation feedback, and
 *    preventing default submission behavior enhance the user experience.
 * 5. Type Safety: Zod schema ensures type safety between form data and our todo item structure,
 *    catching potential type mismatches at compile time.
 */

// Array of available todo types for the select input
const todoTypes: TodoType[] = [
  "education",
  "recreational",
  "social",
  "diy",
  "charity",
  "cooking",
  "relaxation",
  "music",
  "busywork",
];

/**
 * Zod schema for form validation
 * Defines the shape and validation rules for the todo form
 */
const formSchema = z.object({
  activity: z.string().min(1, "Activity is required"),
  price: z.number().min(0, "Price must be positive"),
  type: z.enum([
    "education",
    "recreational",
    "social",
    "diy",
    "charity",
    "cooking",
    "relaxation",
    "music",
    "busywork",
  ]),
  bookingRequired: z.boolean(),
  accessibility: z.number().min(0).max(1),
});

/**
 * TodoForm Component
 * Provides a form interface for creating new todo items
 * Uses react-hook-form with zod validation
 */
export function TodoForm() {
  const { addTodo } = useTodo();

  // Initialize form with zod resolver and default values
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      activity: "",
      price: 0,
      type: "education",
      bookingRequired: false,
      accessibility: 0.5,
    },
  });

  /**
   * Handle form submission
   * Adds the new todo and shows a success toast
   */
  function onSubmit(values: z.infer<typeof formSchema>) {
    addTodo(values);
    form.reset();
    toast.success("Todo added successfully", {
      description: `Added "${values.activity}" to your todo list`,
    });
  }

  return (
    <Card className="w-full max-w-xl">
      <CardHeader>
        <CardTitle>Add New Todo</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Activity Field */}
            <FormField
              control={form.control}
              name="activity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Activity</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter activity..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Price Field */}
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="0"
                      step="0.01"
                      placeholder="Enter price..."
                      {...field}
                      onChange={(e) => field.onChange(parseFloat(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Type Field */}
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {todoTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type.charAt(0).toUpperCase() + type.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Booking Required Field */}
            <FormField
              control={form.control}
              name="bookingRequired"
              render={({ field }) => (
                <FormItem className="flex flex-row space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel>Booking Required</FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Accessibility Field */}
            <FormField
              control={form.control}
              name="accessibility"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Accessibility ({field.value.toFixed(1)})</FormLabel>
                  <FormControl>
                    <Slider
                      min={0}
                      max={1}
                      step={0.1}
                      value={[field.value]}
                      onValueChange={(value) => field.onChange(value[0])}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">Add Todo</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
} 
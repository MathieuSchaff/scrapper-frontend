"use client"
import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { signIn, useSession } from "next-auth/react"
import { redirect } from "next/navigation"

const schema = z.object({
  email: z.string().min(2).max(50),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(128, { message: "Password cannot be longer than 128 characters" }),
  confirmPassword: z.string().min(8).max(128),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ['confirmPassword'], // This tells zod to assign the error to the confirmPassword field
});

type FormValues = z.infer<typeof schema>;
function SignUpForm() {
  const [errorLogin, setErrorLogin] = useState(false);
  const session = useSession();
  if (session?.data?.user) redirect("/");
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });
  async function onSubmit(values: FormValues) {
    // Check if passwords match
    if (values.password !== values.confirmPassword) {
      setErrorLogin(true);
      return;
    }

    // Post the form data to the /api/user endpoint
    try {
      const response = await fetch('/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
      });

      // Check if the response is successful
      if (!response.ok) {
        console.error('Failed to sign up');
        setErrorLogin(true);
        return;
      }

      console.log('Successfully signed up!');

    } catch (error) {
      console.error('Error during sign up:', error);
      setErrorLogin(true);
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 bg-gray-800 p-10 rounded-lg shadow-lg">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="block text-sm font-medium text-gray-300">Email</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="email@example.com" className="mt-1 block w-full py-2 px-3 border border-gray-700 bg-gray-700 text-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                </FormControl>
                {form.formState.errors.email && <FormMessage className="text-sm text-red-500">{form.formState.errors.email.message}</FormMessage>}
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="block text-sm font-medium text-gray-300">Password</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="********" type="password" className="mt-1 block w-full py-2 px-3 border border-gray-700 bg-gray-700 text-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                </FormControl>
                {form.formState.errors.password && <FormMessage className="text-sm text-red-500">{form.formState.errors.password.message}</FormMessage>}
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="block text-sm font-medium text-gray-300">Confirm Password</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="********" type="password" className="mt-1 block w-full py-2 px-3 border border-gray-700 bg-gray-700 text-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                </FormControl>
                {form.formState.errors.confirmPassword && <FormMessage className="text-sm text-red-500">{form.formState.errors.confirmPassword.message}</FormMessage>}
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Sign Up
          </Button>
        </form>
      </Form>
    </div>
  )
}
export default SignUpForm

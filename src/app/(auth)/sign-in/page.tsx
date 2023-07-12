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
    .max(128, { message: "Password cannot be longer than 128 characters" })
  // .refine(
  //   (password) =>
  //     /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,128}$/.test(password),
  //   { message: "Password must contain at least one letter and one number" }
  // ),
});
type FormValues = z.infer<typeof schema>;

function SignInForm() {
  const [errorLogin, setErrorLogin] = useState(false)
  const session = useSession()
  if (session?.data?.user) redirect("/")
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: ''
    }
  });
  async function onSubmit(values: FormValues) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    // Sign in with 'credentials' provider
    try {
      const result = await signIn('credentials', { // 'credentials' is the name of the provider
        redirect: false, // This will prevent the page from being redirected
        email: values.email,
        password: values.password,
        // callbackUrl: "/"
      })
      console.log(result)
      if (result?.error) {
        // Handle error (you could show a notification, for example)
        console.log('Error signing in: ', result.error)
        setErrorLogin(true)
        // throw new Error('Error signing in: ' + result.error)
      }
    } catch (error) {
      console.log('Error signing in: ', error)
      setErrorLogin(true)
      // throw new Error('Error signing in: ' + error)
    }
  }

  return (<div className="min-h-screen flex flex-col items-center justify-center bg-gray-900">
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 bg-gray-800 p-10 rounded-lg shadow-lg">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="block text-sm font-medium text-gray-300">Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="email@example.com"
                  {...field}
                  className="mt-1 block w-full py-2 px-3 border border-gray-700 bg-gray-700 text-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
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
                <Input
                  placeholder="********"
                  type="password"
                  {...field}
                  className="mt-1 block w-full py-2 px-3 border border-gray-700 bg-gray-700 text-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </FormControl>
              {form.formState.errors.password && (
                <FormMessage className="text-sm text-red-500">{form.formState.errors.password.message}</FormMessage>
              )}
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Submit
        </Button>
      </form>
    </Form>
    {errorLogin && <div className="text-red-500 mt-4">Email or password is incorrect</div>}
  </div>)
}
export default SignInForm;

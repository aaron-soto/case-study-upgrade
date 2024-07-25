"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { User, useAuthStore } from "@/hooks/useAuth";
import { auth, db } from "@/lib/firebase";
import {
  browserLocalPersistence,
  browserSessionPersistence,
  setPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import SimpleIcon from "@/components/ui/simple-icon";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  remember_me: z.boolean().optional(),
});

const SignInComponent = () => {
  const [loading, setLoading] = useState(false);
  const { setUser } = useAuthStore();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      remember_me: false,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);

    const { email, password, remember_me } = values;

    if (!email) {
      form.setError("email", {
        message: "Email is required",
      });
      setLoading(false);
      return;
    }

    if (!password) {
      form.setError("password", {
        message: "Password is required",
      });
      setLoading(false);
      return;
    }

    const persistence = remember_me
      ? browserLocalPersistence
      : browserSessionPersistence;

    try {
      await setPersistence(auth, persistence);
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      const userRef = doc(db, "users", user.uid);
      const userSnapshot = await getDoc(userRef);
      if (userSnapshot.exists()) {
        const userData = userSnapshot.data() as User;
        setUser({
          ...userData,
          lastSeen: {
            nanoseconds: new Date().getMilliseconds() * 1e6,
            seconds: Math.floor(new Date().getTime() / 1000),
          },
        });
      }

      router.push("/");
    } catch (error: any) {
      const errorMessage = error.message || "An unexpected error occurred";
      form.setError("email", { message: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container flex my-16 items-center">
      <div className="w-[400px] mx-auto">
        <h1 className="text-2xl font-bold text-center">Welcome back</h1>
        <p className="mb-6 text-center text-gray-500">
          Sign in to your account to continue
        </p>

        <div className="flex gap-2 my-4">
          <Button variant="outline" size="lg" className="w-full" disabled>
            <img src="/images/logos/apple_logo.svg" className="h-5" />
          </Button>
          <Button variant="outline" size="lg" className="w-full" disabled>
            <img src="/images/logos/google_logo.svg" className="h-5" />
          </Button>
          <Button variant="outline" size="lg" className="w-full" disabled>
            <img src="/images/logos/facebook_logo.svg" className="h-5" />
          </Button>
        </div>

        <div className="flex items-center my-8">
          <div className="flex-1 h-px bg-gray-100"></div>
          <p className="mx-4 text-xs text-gray-300">OR</p>
          <div className="flex-1 h-px bg-gray-100"></div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }: { field: any }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      autoComplete="email"
                      className="text-base"
                      placeholder="Enter your email..."
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
              render={({ field }: { field: any }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className="text-base"
                      type="password"
                      placeholder="Enter your password..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <FormField
                  control={form.control}
                  name="remember_me"
                  render={({ field }: { field: any }) => (
                    <FormItem className="flex items-center justify-center gap-2 mb-1">
                      <FormControl className="mt-1">
                        <Checkbox
                          className="w-4 h-4"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel>Remember me</FormLabel>
                    </FormItem>
                  )}
                />
              </div>
              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-indigo-600 underline hover:no-underline hover:text-indigo-500"
                >
                  Forgot your password?
                </a>
              </div>
            </div>
            {loading ? (
              <Button className="w-full" disabled>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              </Button>
            ) : (
              <Button className="w-full" type="submit">
                Sign In
              </Button>
            )}
            <p className="text-sm text-center">
              Don&apos;t have an account yet?{" "}
              <Link href="/signup" className="font-semibold underline">
                Sign Up
              </Link>
            </p>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default SignInComponent;

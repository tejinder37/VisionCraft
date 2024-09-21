"use client";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useSignUp } from "@/features/auth/hooks/use-sign-up";
import { TriangleAlert } from "lucide-react";

export const SignUpCard = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const mutation = useSignUp();
  const onCredentialSignUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate(
      {
        name,
        email,
        password,
      },
      {
        onSuccess: () => {
          signIn("credentials", {
            email,
            password,
            callbackUrl: "/",
          });
        },
      }
    );
  };
  const onProviderSignup = (provider: "github" | "google") => {
    signIn(provider, { callbackUrl: "/" });
  };
  return (
    <Card className=" w-full h-full p-8">
      <CardHeader className="px-0 pt-0">
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Use your email or another service to continue
        </CardDescription>
      </CardHeader>
      {!!mutation.error && (
        <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6">
          <TriangleAlert className="size-4" />
          <p>Something went wrong</p>
        </div>
      )}
      <CardContent className="space-y-5 px-0 pb-0">
        <form onSubmit={onCredentialSignUp} className="space-y-2.5">
          <Input
            value={name}
            type="text"
            onChange={(e) => {
              setName(e.target.value);
            }}
            placeholder="Name"
            required
            disabled={mutation.isPending}
          />
          <Input
            value={email}
            type="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="Email"
            required
            disabled={mutation.isPending}
          />
          <Input
            value={password}
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="Password"
            required
            minLength={3}
            maxLength={20}
            disabled={mutation.isPending}
          />
          <Button
            type="submit"
            className="w-full"
            size="lg"
            disabled={mutation.isPending}
          >
            Continue
          </Button>
        </form>
        <Separator />

        <div className=" flex flex-col gap-y-2.5">
          <Button
            variant="outline"
            size="lg"
            className="w-full relative"
            onClick={() => {
              onProviderSignup("google");
            }}
            disabled={mutation.isPending}
          >
            <FcGoogle className="mr-2 size-5 top-2.5 left-5 absolute" />
            Continue with Google
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="w-full relative"
            onClick={() => {
              onProviderSignup("github");
            }}
            disabled={mutation.isPending}
          >
            <FaGithub className="mr-2 size-5 top-2.5 left-5 absolute" />
            Continue with Github
          </Button>

          <p className="text-xs text-muted-foreground">
            Already have an account?{" "}
            <Link href="/sign-in">
              <span className="text-sky-700 hover:underline">Sign in</span>
            </Link>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

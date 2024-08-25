import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";


export default function Register() {
  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-foreground">
            Register for a new account
          </h2>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            Or{" "}
            <Link href="/login" className="font-medium text-primary hover:text-primary/90" prefetch={false}>
              sign in to your existing account
            </Link>
          </p>
        </div>
        <form className="space-y-6" action="#" method="POST">
          <div>
            <Label htmlFor="username" className="sr-only">
              Username
            </Label>
            <Input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              required
              placeholder="Username"
              className="relative block w-full appearance-none rounded-md border border-input bg-background px-3 py-2 text-foreground placeholder-muted-foreground focus:z-10 focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
            />
          </div>
          <div>
            <Label htmlFor="email" className="sr-only">
              Email address
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="Email address"
              className="relative block w-full appearance-none rounded-md border border-input bg-background px-3 py-2 text-foreground placeholder-muted-foreground focus:z-10 focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
            />
          </div>
          <div>
            <Label htmlFor="password" className="sr-only">
              Password
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              placeholder="Password"
              className="relative block w-full appearance-none rounded-md border border-input bg-background px-3 py-2 text-foreground placeholder-muted-foreground focus:z-10 focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
            />
          </div>
          <div>
            <Button
              type="submit"
              className="relative flex w-full justify-center rounded-md bg-primary py-2 px-4 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
              Register
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

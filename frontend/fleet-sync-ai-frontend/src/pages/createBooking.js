// pages/createBooking.js

import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function CreateBooking() {
  return (
    <div>
      <header className="flex items-center justify-between h-16 px-4 bg-background border-b sm:px-6">
        <div className="flex items-center gap-2">
          <Link href="#" className="flex items-center" prefetch={false}>
            <MountainIcon className="w-6 h-6" />
            <span className="text-lg font-bold">FleetSync AI</span>
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="px-3 py-1 bg-muted rounded-full text-sm font-medium cursor-pointer">John Doe</div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem>
                <Link href="#" className="flex items-center gap-2" prefetch={false}>
                  <div className="h-4 w-4" />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="#" className="flex items-center gap-2" prefetch={false}>
                  <div className="h-4 w-4" />
                  <span>Settings</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href="#" className="flex items-center gap-2" prefetch={false}>
                  <div className="h-4 w-4" />
                  <span>Logout</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 w-full max-w-5xl">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight text-foreground">Book Here</h2>
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="source" className="sr-only">
                    Source
                  </Label>
                  <Input
                    id="source"
                    name="source"
                    type="text"
                    placeholder="Source"
                    className="relative block w-full appearance-none rounded-md border border-input bg-background px-3 py-2 text-foreground placeholder-muted-foreground focus:z-10 focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
                  />
                </div>
                <div>
                  <Label htmlFor="destination" className="sr-only">
                    Destination
                  </Label>
                  <Input
                    id="destination"
                    name="destination"
                    type="text"
                    placeholder="Destination"
                    className="relative block w-full appearance-none rounded-md border border-input bg-background px-3 py-2 text-foreground placeholder-muted-foreground focus:z-10 focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="quantity" className="sr-only">
                    Quantity
                  </Label>
                  <Input
                    id="quantity"
                    name="quantity"
                    type="number"
                    placeholder="Quantity"
                    className="relative block w-full appearance-none rounded-md border border-input bg-background px-3 py-2 text-foreground placeholder-muted-foreground focus:z-10 focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
                  />
                </div>
                <div>
                  <Label htmlFor="deadline" className="sr-only">
                    Deadline
                  </Label>
                  <Input
                    id="deadline"
                    name="deadline"
                    type="date"
                    className="relative block w-full appearance-none rounded-md border border-input bg-background px-3 py-2 text-foreground placeholder-muted-foreground focus:z-10 focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
                  />
                </div>
              </div>
              <Button
                type="submit"
                className="relative flex w-full justify-center rounded-md bg-primary py-2 px-4 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                Book
              </Button>
            </form>
          </div>
          <div className="flex items-center justify-center">
            <div className="grid grid-cols-3 gap-4">
              <img
                src="/placeholder.svg"
                width={100}
                height={100}
                alt="Truck"
                className="object-contain"
                style={{ aspectRatio: "100/100", objectFit: "cover" }}
              />
              <img
                src="/placeholder.svg"
                width={100}
                height={100}
                alt="Ship"
                className="object-contain"
                style={{ aspectRatio: "100/100", objectFit: "cover" }}
              />
              <img
                src="/placeholder.svg"
                width={100}
                height={100}
                alt="Plane"
                className="object-contain"
                style={{ aspectRatio: "100/100", objectFit: "cover" }}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function MountainIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}

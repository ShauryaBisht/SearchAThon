import { TbWorldSearch } from "react-icons/tb";
import { Menu } from "lucide-react";
import { ModeToggle } from "./Modetoggle";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function Navbar() {
  return (
    <header className="w-full border-b sticky top-0 z-50 dark:bg-slate-950/80 backdrop-blur  border-slate-800">
      <div className="mx-auto flex h-16 max-w-8xl items-center justify-between px-4">
        <div className="flex items-center gap-x-0.5">
          <TbWorldSearch className="text-blue-600 text-2xl" />
          <h1 className="font-semibold text-blue-600 text-2xl">SearchAThon</h1>
        </div>
        <nav className="hidden md:block">
          <ul className="flex items-center gap-10 text-slate-600">
            <a href="/"><li className="text-slate-700 dark:text-slate-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">Home</li></a>
            <li className="text-slate-700 dark:text-slate-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">Explore</li>
            <li className="text-slate-700 dark:text-slate-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors whitespace-nowrap">
              Contact Us
            </li>
            <li><ModeToggle /></li>
          </ul>
        </nav>
        <div className="hidden md:flex items-center gap-3">
          <a href="/login"><Button variant="outline">Login</Button></a>
          <Button>Sign Up</Button>
        </div>
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <div className="mt-8 flex flex-col gap-4 p-2">
                <button className="text-left text-lg">Home</button>
                <button className="text-left text-lg">Explore</button>
                <button className="text-left text-lg">Contact Us</button>

                <div className="pt-4 flex flex-col gap-3">
                   
                  <Button>Login</Button>
                  <Button>Sign Up</Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

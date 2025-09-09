import { useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import "./App.css";

function App() {
  const [open, setOpen] = useState(false);

  const Sidebar = () => (
    <div className="flex flex-col gap-4 p-4 w-64 bg-gray-100 h-full">
      <h2 className="text-xl font-semibold">Menu</h2>
      <nav className="flex flex-col gap-2">
        <a href="#" className="hover:text-blue-600">
          Dashboard
        </a>
        <a href="#" className="hover:text-blue-600">
          Settings
        </a>
        <a href="#" className="hover:text-blue-600">
          Profile
        </a>
      </nav>
    </div>
  );

  return (
    <div className="flex h-screen flex-col md:flex-row">
      {/* Mobile top bar */}
      <div className="flex items-center gap-2 p-4 border-b md:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" onClick={() => setOpen(true)}>
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-64">
            <Sidebar />
          </SheetContent>
        </Sheet>
        <span className="font-semibold text-lg">Menu</span>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden md:block border-r">
        <Sidebar />
      </div>

      {/* Main content */}
      <main className="flex-1 p-6 overflow-y-auto">
        <h1 className="text-3xl font-bold tracking-tight">My App</h1>
        <p>Now the app is deployed through GitHub Actions!</p>
      </main>
    </div>
  );
}

export default App;

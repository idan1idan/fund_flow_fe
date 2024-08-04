import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "./components/mode-toggle";
import { Bell, Menu } from "lucide-react";
import { Button } from "./components/ui/button";
import { IncomeForm } from "./components/incomeForm";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <header>
        <div className="flex h-80 flex-col rounded-b-[50px] bg-primary px-8 py-6 drop-shadow-xl">
          <div className="flex w-full justify-between">
            <Menu />
            <Bell />
          </div>
        </div>
      </header>
      <ModeToggle />
      <main className="flex h-full w-full flex-col items-center justify-center">
        <IncomeForm>
          <Button>Open</Button>
        </IncomeForm>
      </main>
    </ThemeProvider>
  );
}

export default App;

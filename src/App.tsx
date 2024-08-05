import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "./components/mode-toggle";
import { Bell, Menu, Plus } from "lucide-react";
import { Button } from "./components/ui/button";
import { BadgeDollarSign, BadgePercent } from "lucide-react";
import { IncomeForm } from "./components/incomeForm";
import { FundingForm } from "./components/fundingForm";

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
        <div className="flex items-center justify-center gap-2">
          <IncomeForm>
            <Button className="gap-1" variant={"outline"}>
              <BadgeDollarSign /> Add income
            </Button>
          </IncomeForm>
          <FundingForm>
            <Button className="gap-1" variant={"outline"}>
              <BadgePercent />
              Add funding
            </Button>
          </FundingForm>
        </div>
      </main>
    </ThemeProvider>
  );
}

export default App;

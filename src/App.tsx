import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "./components/mode-toggle";
import { Bell, Menu } from "lucide-react";
import { Button } from "./components/ui/button";
import { BadgeDollarSign, BadgePercent } from "lucide-react";
import { IncomeForm } from "./components/incomeForm";
import { FundingForm } from "./components/fundingForm";
import { useState } from "react";
import { ITimelineCard, TimelineCard } from "./components/timelineCard";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "./components/ui/toaster";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {},
  },
});
function App() {
  const [timeline, setTimeline] = useState<ITimelineCard[]>([
    {
      title: "Income",
      description: "This is a description",
      amount: "100",
      date: new Date(),
      type: "income",
    },
  ]);
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <ReactQueryDevtools initialIsOpen={false} />
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <header>
          <div className="flex h-80 flex-col rounded-b-[50px] bg-primary-foreground px-8 py-6 drop-shadow-xl">
            <div className="flex w-full justify-between">
              <Menu />
              <Bell />
            </div>
            <ModeToggle />
          </div>
        </header>
        <main className="flex h-full w-full flex-col items-center justify-center gap-4 py-4">
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
          <div className="flex w-full flex-col gap-2 px-4">
            {timeline.map((item) => (
              <TimelineCard
                key={item.title}
                title={item.title}
                description={item.description}
                amount={item.amount}
                date={item.date}
                type={item.type}
              />
            ))}
          </div>
        </main>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { PropsWithChildren } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { cn } from "@/lib/utils";
import { CalendarIcon, BadgePercent, Info } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import {
  Tooltip,
  TooltipProvider,
  TooltipContent,
  TooltipTrigger,
} from "./ui/tooltip";
const INCOME_TYPE: Record<IncomeTypeKey, number> = {
  BANK_TRANSACTION: 1,
  SALARY: 2,
  CASH: 3,
  BIT: 4,
  PAYPAL: 5,
  OTHER: 7,
  CHECK: 8,
} as const;

const INCOME_TYPE_KEYS = [
  "BANK_TRANSACTION",
  "SALARY",
  "CASH",
  "BIT",
  "PAYPAL",
  "OTHER",
  "CHECK",
] as const;
type IncomeTypeKey = (typeof INCOME_TYPE_KEYS)[number];

const incomeSchema = z.object({
  amount: z.number().min(1),
  fundAmount: z.number().min(1),
  incomeType: z.enum(INCOME_TYPE_KEYS),
  source: z.string().min(1),
  transactionDate: z.date(),
  description: z.string().optional(),
});

const IncomeForm = (props: PropsWithChildren<{}>) => {
  const incomeForm = useForm<z.infer<typeof incomeSchema>>({
    resolver: zodResolver(incomeSchema),
  });
  const onSubmit = (data: z.infer<typeof incomeSchema>) => {
    console.log(data);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>{props.children}</DialogTrigger>
      <DialogContent className="max-w-screen flex h-svh w-full flex-col p-0">
        <DialogHeader className="p-6 shadow-xl">
          <DialogTitle>Income</DialogTitle>
          <DialogDescription>
            This actions will add an income to your timeline.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center overflow-auto px-4">
          <Form {...incomeForm}>
            <form
              id="income-form"
              onSubmit={incomeForm.handleSubmit(onSubmit)}
              className="w-full space-y-4"
            >
              <FormField
                control={incomeForm.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>* Amount</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) => {
                          const value = e.target.value;
                          Number.isNaN(value)
                            ? field.onChange(0)
                            : field.onChange(parseFloat(value));
                        }}
                      />
                    </FormControl>
                    <FormDescription>
                      The amount of money you received.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={incomeForm.control}
                name="fundAmount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>* Fund Amount</FormLabel>
                    <FormControl>
                      <div className="flex items-center gap-4">
                        <Input type="number" {...field} />
                        <TooltipProvider>
                          <Tooltip>
                            <div className="relative flex">
                              <TooltipTrigger
                                className="absolute right-0 top-0"
                                type="button"
                              >
                                <Info />
                              </TooltipTrigger>
                              <Button
                                type="button"
                                variant="outline"
                                className="relative"
                                onClick={() => {
                                  const amount = incomeForm.getValues().amount;

                                  if (amount) {
                                    const fundAmount = amount * 0.1;
                                    field.onChange(fundAmount);
                                  }
                                }}
                              >
                                <BadgePercent />
                              </Button>
                            </div>
                            <TooltipContent>
                              Calculate the fund amount based on the amount.
                              will be 10% of the amount.
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </FormControl>
                    <FormDescription>
                      The amount of money you want to use for your fund.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={incomeForm.control}
                name="incomeType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>* Income type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select an income type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {INCOME_TYPE_KEYS.map((key) => (
                          <SelectItem key={key} value={key}>
                            {key}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={incomeForm.control}
                name="transactionDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>* Transaction date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground",
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormDescription>Transaction date.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={incomeForm.control}
                name="source"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>* Source</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormDescription>
                      The source of the transaction.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={incomeForm.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormDescription>
                      Description of the transaction.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>
        <DialogFooter className="px-4">
          <Button form="income-form" variant="default" className="w-full">
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export { IncomeForm, INCOME_TYPE, INCOME_TYPE_KEYS, type IncomeTypeKey };

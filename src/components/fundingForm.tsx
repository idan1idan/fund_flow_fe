import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Form, useForm } from "react-hook-form";
import { DialogHeader, DialogFooter } from "./ui/dialog";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { PropsWithChildren } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";

export const TRANSACTION_TYPE = {
  BANK_TRANSACTION: 1,
  CREDIT_CARD: 2,
  CASH: 3,
  BIT: 4,
  PAYPAL: 5,
  NEDARIM_PLUS: 6,
  OTHER: 7,
  CHECK: 8,
} as const;

export type TRANSACTION_TYPE_KEYS = keyof typeof TRANSACTION_TYPE;

const TRANSACTION_TYPE_KEYS = [
  "BANK_TRANSACTION",
  "CREDIT_CARD",
  "CASH",
  "BIT",
  "PAYPAL",
  "NEDARIM_PLUS",
  "OTHER",
  "CHECK",
] as const;

const fundingSchema = z.object({
  amount: z.number().min(1),
  beneficiary: z.string().min(1),
  description: z.string().optional(),
  transactionType: z.enum(TRANSACTION_TYPE_KEYS),
  transactionDate: z.date(),
});

const FundingForm = (props: PropsWithChildren<{}>) => {
  const fundingForm = useForm<z.infer<typeof fundingSchema>>({
    resolver: zodResolver(fundingSchema),
  });
  const onSubmit = (data: z.infer<typeof fundingSchema>) => {
    console.log(data);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>{props.children}</DialogTrigger>
      <DialogContent className="max-w-screen flex h-screen flex-col p-0">
        <DialogHeader className="p-6 shadow-xl">
          <DialogTitle>Funding</DialogTitle>
          <DialogDescription>
            This actions will add a funding to your timeline.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center overflow-auto px-4">
          <Form {...fundingForm}>
            <form
              id="income-form"
              onSubmit={fundingForm.handleSubmit(onSubmit)}
              className="w-full space-y-4"
            >
              <FormField
                control={fundingForm.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>* Amount</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormDescription>
                      The amount of money you you want to use for your fund.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={fundingForm.control}
                name="transactionType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>* Transaction type</FormLabel>
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
                        {TRANSACTION_TYPE_KEYS.map((key) => (
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
                control={fundingForm.control}
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
                control={fundingForm.control}
                name="beneficiary"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>* Beneficiary</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormDescription>
                      The beneficiary of the transaction.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={fundingForm.control}
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

export { FundingForm };

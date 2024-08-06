import { PropsWithChildren } from "react";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Calendar, Coins } from "lucide-react";
interface ITimelineCard {
  title: string;
  description: string;
  amount: string;
  date: Date;
  type: "income" | "funding";
}
const TimelineCard = (props: PropsWithChildren<ITimelineCard>) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{props.title}</CardTitle>
        <CardDescription>{props.description}</CardDescription>
      </CardHeader>
      <CardFooter className="justify-between">
        <div className="flex items-center gap-2">
          <Coins />
          <p className="text-2xl font-bold">{props.amount}</p>
        </div>
        <div className="flex items-center gap-2">
          <Calendar />
          <p className="font-bold">{props.date.toLocaleDateString()}</p>
        </div>
      </CardFooter>
    </Card>
  );
};

export { TimelineCard, type ITimelineCard };

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import {DateRange, Range } from "react-date-range";
import { useState } from "react";
import { addDays } from "date-fns"; // Thêm import này

type Props = {
    onDateRangeChange: (startDate: Date, endDate: Date, length: number) => void;
  };
  
// eslint-disable-next-line no-empty-pattern
export default function Calendar({onDateRangeChange}: Props) {
  const [state, setState] = useState<Range[]>([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 5),
      key: "selection",
    },
  ]);

  const handleDateChange = (ranges: any) => {
    const { startDate, endDate } = ranges.selection;
    const newStartDate = startDate || state[0].startDate;
    const newEndDate = endDate || state[0].endDate;
    const length =
      Math.round(
        (newEndDate!.getTime() - newStartDate!.getTime()) / (24 * 60 * 60 * 1000)
      ) || 0;
  
    setState([ranges.selection]);
    onDateRangeChange(newStartDate!, newEndDate!, length);
  };

  return (
      <DateRange
        onChange={(ranges: any) => handleDateChange(ranges as Range[])}
        moveRangeOnFirstSelection={false}
        months={2}
        ranges={state}
        direction="horizontal"
        preventSnapRefocus={true}
        calendarFocus="forwards"
        showDateDisplay={false}
        rangeColors={["#262626"]}
        date={new Date()}
        minDate={new Date()}
        showMonthAndYearPickers = {false}
      />
  );
}

    
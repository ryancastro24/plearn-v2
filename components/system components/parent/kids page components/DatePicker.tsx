"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DatePickerProps {
  value?: string; // 👈 now STRING instead of Date
  onChange?: (date: string | null) => void;
}

export function DatePicker({ value, onChange }: DatePickerProps) {
  // convert string → Date for UI only
  const [internalDate, setInternalDate] = React.useState<Date | undefined>(
    value ? new Date(value + "T00:00:00") : undefined,
  );

  React.useEffect(() => {
    setInternalDate(value ? new Date(value + "T00:00:00") : undefined);
  }, [value]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          data-empty={!internalDate}
          className="data-[empty=true]:text-muted-foreground w-full justify-start text-left font-normal"
        >
          <CalendarIcon />
          {internalDate ? (
            format(internalDate, "PPP")
          ) : (
            <span>Pick a date</span>
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={internalDate}
          onSelect={(date) => {
            if (!date) {
              setInternalDate(undefined);
              onChange?.(null);
              return;
            }

            setInternalDate(date);

            // 🔥 IMPORTANT: convert to YYYY-MM-DD
            const safeDate = format(date, "yyyy-MM-dd");

            onChange?.(safeDate);
          }}
        />
      </PopoverContent>
    </Popover>
  );
}

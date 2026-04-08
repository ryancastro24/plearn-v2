"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// Add props interface
interface DatePickerProps {
  value?: Date; // current value from parent
  onChange?: (date: Date | null) => void; // callback to parent
}

export function DatePicker({ value, onChange }: DatePickerProps) {
  // Use prop value if provided, otherwise internal state
  const [internalDate, setInternalDate] = React.useState<Date | undefined>(
    value,
  );

  // Update both internal state and call onChange
  const handleSelect = (date: Date) => {
    setInternalDate(date);
    onChange?.(date ?? null);
  };

  // Keep internal state in sync if parent value changes
  React.useEffect(() => {
    setInternalDate(value);
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
      <PopoverContent className="w-full p-0">
        <Calendar
          mode="single"
          selected={internalDate}
          onSelect={(date: Date | undefined) => {
            setInternalDate(date);
            onChange?.(date ?? null);
          }}
          required={false}
        />
      </PopoverContent>
    </Popover>
  );
}

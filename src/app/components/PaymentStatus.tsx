"use client"

import * as React from "react"
import { useState, useEffect } from "react";
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export function PaymentStatus({ onPaymentStatusSelect }: { onPaymentStatusSelect: (paymentStatus: string) => void }) {
  const [open, setOpen] = React.useState(false)
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus[]>([]);
  const [value, setValue] = React.useState("Pending")

  interface PaymentStatus {
    value: string;
    label: string;
  }
  
  const arrayOfPaymentStatus = [
    {
      value: "Pending",
      label: "Pending",
    },
    {
      value: "Done",
      label: "Done",
    }
  ]
  
  useEffect(() => {
    setPaymentStatus(arrayOfPaymentStatus);
  }, []);

  const handlePaymentStatusSelect = (currentValue:any) => {
    setValue(currentValue === value ? "" : currentValue)
    onPaymentStatusSelect(currentValue)
    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? paymentStatus.find((status) => status.value === value)?.label
            : "Select status..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
          <CommandEmpty>No status found.</CommandEmpty>
          <CommandGroup>
            {paymentStatus.map((status) => (
              <CommandItem
                key={status.value}
                value={status.value}
                onSelect={handlePaymentStatusSelect}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === status.value ? "opacity-100" : "opacity-0"
                  )}
                />
                <span>{status.label}</span>
              </CommandItem>
            ))}
          </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

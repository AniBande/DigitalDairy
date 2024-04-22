"use client";
import * as React from "react";
import axios from "axios";
import { Check, ChevronsUpDown } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface Farmer {
  _id: string;
  username: string;
}

export function FarmerInput({ onFarmerSelect }: { onFarmerSelect: (farmerId: string) => void }
) {
  const [farmers, setFarmers] = useState<Farmer[]>([]);
  const [value, setValue] = React.useState("");
  const [open, setOpen] = React.useState(false);

  async function fetchFarmers() {
    try {
      const response = await axios.get("/api/users/allFarmers");
      setFarmers(response.data.farmers);
    } catch (error) {
      console.error("Error fetching farmers:", error);
      toast.error("Error fetching all farmers");
    }
  }

  useEffect(() => {
    fetchFarmers();
  }, []);

  const handleFarmerSelect = (currentValue:any) => {
    setValue(currentValue === value ? "" : currentValue);
    onFarmerSelect(currentValue);
    setOpen(false);
  };
  
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
            ? farmers.find((farmer) => farmer.username === value)?.username
            : "Select farmer..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command className="rounded-lg border shadow-md">
          <CommandInput placeholder="Search a farmer" />
          <CommandList>
            {farmers.length === 0 && (
              <CommandEmpty>No results found.</CommandEmpty>
            )}

            <CommandGroup heading="Farmers">
              {farmers.map((farmer) => 
                <CommandItem
                  key={farmer._id}
                  value={farmer.username}
                  onSelect={handleFarmerSelect}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === farmer.username ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {/* <User className="mr-2 h-4 w-4" />
                  <span>{farmer.username}</span> */}
                  {farmer.username}
                </CommandItem>
              )}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

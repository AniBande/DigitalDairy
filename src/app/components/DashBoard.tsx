"use client"
import Link from "next/link";
import PendingTransactions from "./PendingTransactions";
import { Navbar } from "./Navbar";

import {
  CircleUser,
  EditIcon,
  LogOut,
  Menu,
  Package2,
  Search,
} from "lucide-react";


import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
 
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Profile } from "./Profile";
import Logout from "./Logout";
import { TransactionBox } from "./TransactionBox";
import TransactionTable from "./TransactionTable";
import { HistoryTable } from "./HistoryTable";
import RecentTransactions from "./RecentTransactions";
import { TableDemo } from "./TableDemo";
import { useState } from "react";

export function Dashboard() {

  const [pendingTransactionsKey, setPendingTransactionsKey] = useState(0);
  const [tableDemoKey, setTableDemoKey] = useState(0);

  const handleTransactionCreated = () => {
    // Increment a key to force re-render of PendingTransactions component
    setPendingTransactionsKey((prevKey) => prevKey + 1);
    setTableDemoKey((prevKey) => prevKey + 1);
  };

  

  

  return (
    <div className="flex min-h-screen w-full flex-col">
      
      

      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
          <TransactionBox  onTransactionCreated={handleTransactionCreated} />
          {/* <TransactionTable/> */}
          {/* <HistoryTable/> */}
          <TableDemo  key={tableDemoKey} onTransactionCreated={handleTransactionCreated} /> 
          <PendingTransactions  key={pendingTransactionsKey} />
         
        </div>
      </main>
    </div>
  );
}

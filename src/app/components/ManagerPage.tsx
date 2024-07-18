"use client"
import PendingTransactions from "./PendingTransactions";
import TableDemo from "./TableDemo";
import { TransactionBox } from "./TransactionBox";
import { useRef } from "react";

export function ManagerPage() {

  const pendingTransactionsRef = useRef<HTMLButtonElement>(null);
  const tableDemoRef = useRef<HTMLButtonElement>(null);

  const handlePay = () => {
    if (pendingTransactionsRef.current) {
      pendingTransactionsRef.current.click();
    }
    if (tableDemoRef.current) {
      tableDemoRef.current.click();
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
          <TransactionBox onPay={handlePay}/>
          <TableDemo ref={tableDemoRef} onPay={handlePay} />
          <PendingTransactions ref={pendingTransactionsRef} onPay={handlePay} />
        </div>
      </main>
    </div>
  );
}
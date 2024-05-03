"use client"
import PendingTransactions from "./PendingTransactions";
import { TransactionBox } from "./TransactionBox";
import { TableDemo } from "./TableDemo";
import { useState } from "react";

export function Dashboard() {

  //const [pendingTransactionsKey, setPendingTransactionsKey] = useState(0);
  const [tableDemoKey, setTableDemoKey] = useState(0);

  const handleTransactionCreated = () => {
    // Increment a key to force re-render of PendingTransactions component
   // setPendingTransactionsKey((prevKey) => prevKey + 1);
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
          <PendingTransactions />
        </div>
      </main>
    </div>
  );
}

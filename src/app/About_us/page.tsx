"use client"

import { Navbar } from "../components/Navbar";


export default function About_us() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      
    <Navbar/>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
          {/* <TransactionBox/>
          {/* <TransactionTable/> */}
          {/* <HistoryTable/> */}
          {/* <TableDemo/> 
          <PendingTransactions/> */}
          
          <h1>About Us Page in Progress</h1>

        </div>
      </main>
    </div>
  );
}

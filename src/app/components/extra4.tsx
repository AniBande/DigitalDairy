// "use client";
// import { Navbar } from "../components/Navbar";
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { toast } from "react-hot-toast";
// import { Badge } from "@/components/ui/badge";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Label } from "@/components/ui/label";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import {
//   Tabs,
//   TabsContent,
//   TabsList,
//   TabsTrigger,
// } from "@/components/ui/tabs";
// import {
//   TooltipProvider,
//   Tooltip,
//   TooltipContent,
//   TooltipTrigger,
// } from "@/components/ui/tooltip";

// interface Transaction {
//   quantity: number;
//   cost: number;
//   paymentStatus: string;
//   createdAt: string;
//   farmerId: string;
//   userId: string;
// }

// export default function History() {
//   const [filterOption, setFilterOption] = useState<string>("all");
//   const [farmerId, setFarmerId] = useState<string>("");
//   const [userId, setUserId] = useState<String>("ID");
//   const [userRole, setUserRole] = useState("nothing");
//   const [transactions, setTransactions] = useState<Transaction[]>([]);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [batchSize, setBatchSize] = useState<number>(5);
//   const [displayedTransactions, setDisplayedTransactions] = useState<number>(
//     5
//   );
//   const [selectedTab, setSelectedTab] = useState<string>("all");

//   const getUserDetails = async () => {
//     try {
//       const res = await axios.get("/api/users/me");
//       setUserId(res.data.data._id);
//       setUserRole(res.data.data.role);
//     } catch (error) {
//       console.error("Error fetching user details:", error);
//       toast.error("Error fetching user details. Please try again.");
//     }
//   };

//   useEffect(() => {
//     getUserDetails();
//   }, []);

//   useEffect(() => {
//     fetchTransactions();
//   }, [farmerId, userRole, userId]);

//   const fetchTransactions = async () => {
//     try {
//       setLoading(true);
//       let apiUrl = `/api/users/Hist`;

//       if (userRole === "manager") {
//         apiUrl += `?userId=${userId}&farmerId=${farmerId}&userRole=${userRole}`;
//       } else {
//         apiUrl += `?userId=${userId}&userRole=${userRole}`;
//       }

//       const response = await axios.get(apiUrl);
//       setTransactions(response.data.transactions);
//     } catch (error: any) {
//       console.error("Error fetching transactions:", error.message);
//       toast.error("Error fetching transactions");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const filterTransactions = () => {
//     const today = new Date();
//     return transactions.filter((transaction) => {
//       const transactionDate = new Date(transaction.createdAt);
//       switch (filterOption) {
//         case "today":
//           return (
//             transaction.paymentStatus === selectedTab &&
//             transactionDate.toDateString() === today.toDateString()
//           );
//         case "week":
//           const startOfWeek = new Date(today);
//           startOfWeek.setDate(today.getDate() - today.getDay());
//           return (
//             transaction.paymentStatus === selectedTab &&
//             transactionDate >= startOfWeek
//           );
//         case "month":
//           return (
//             transaction.paymentStatus === selectedTab &&
//             transactionDate.getMonth() === today.getMonth() &&
//             transactionDate.getFullYear() === today.getFullYear()
//           );
//         default:
//           return transaction.paymentStatus === selectedTab;
//       }
//     });
//   };

//   const handleTabChange = (tab: string) => {
//     setSelectedTab(tab);
//   };

//   const handleFilterChange = (
//     event: React.ChangeEvent<HTMLSelectElement>
//   ) => {
//     setFilterOption(event.target.value);
//   };

//   const handleFarmerChange = (
//     event: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     setFarmerId(event.target.value);
//   };

//   return (
//     <TooltipProvider>
//       <Navbar />

//       <div className="flex min-h-screen w-full flex-col bg-muted/40">
//         <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
//           <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
//             <Tabs defaultValue="all">
//               <div className="flex items-center">
//                 <TabsList>
//                   <TabsTrigger
//                     value="all"
//                     onClick={() => handleTabChange("all")}
//                   >
//                     All
//                   </TabsTrigger>
//                   <TabsTrigger
//                     value="Done"
//                     onClick={() => handleTabChange("Done")}
//                   >
//                     Done
//                   </TabsTrigger>
//                   <TabsTrigger
//                     value="Pending"
//                     onClick={() => handleTabChange("Pending")}
//                   >
//                     Pending
//                   </TabsTrigger>
//                 </TabsList>

//                 {userRole === "manager" && (
//                   <div>
//                     <label htmlFor="farmerId">Enter Farmer's ID:</label>
//                     <input
//                       className="mx-4"
//                       type="text"
//                       id="farmerId"
//                       value={farmerId}
//                       onChange={handleFarmerChange}
//                     />
//                   </div>
//                 )}

//                 <button
//                   onClick={fetchTransactions}
//                   className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
//                 >
//                   Fetch
//                 </button>

//                 <div className="ml-auto flex items-center gap-2">
//                   <Label htmlFor="name">Name</Label>
//                   <select
//                     id="filter"
//                     value={filterOption}
//                     onChange={handleFilterChange}
//                     className="border border-black border-2"
//                   >
//                     <option value="all">All</option>
//                     <option value="today">Today</option>
//                     <option value="week">This Week</option>
//                     <option value="month">This Month</option>
//                   </select>
//                 </div>
//               </div>

//               <TabsContent value={selectedTab}>
//                 <Card x-chunk="dashboard-06-chunk-0">
//                   <CardHeader>
//                     <CardTitle>Transactions</CardTitle>
//                     <CardDescription>
//                       Manage your products and view their sales performance.
//                     </CardDescription>
//                   </CardHeader>
//                   <CardContent>
//                     <Table>
//                       <TableHeader>
//                         <TableRow>
//                           <TableHead>Name</TableHead>
//                           <TableHead>Status</TableHead>
//                           <TableHead className="hidden md:table-cell">
//                             Amount
//                           </TableHead>
//                           <TableHead className="hidden md:table-cell">
//                             Quantity
//                           </TableHead>
//                           <TableHead className="hidden md:table-cell">
//                             Created at
//                           </TableHead>
//                           <TableHead>
//                             <span className="sr-only">Actions</span>
//                           </TableHead>
//                         </TableRow>
//                       </TableHeader>

//                       <TableBody>
//                         {filterTransactions()
//                           .slice(0, displayedTransactions)
//                           .map((transaction, index) => (
//                             <li
//                               key={index}
//                               className="flex flex-row items-center mb-4"
//                             >
//                               <TableRow>
//                                 <TableCell className="font-medium">
//                                   {transaction.farmerId}
//                                 </TableCell>
//                                 <TableCell>
//                                   <Badge variant="outline">
//                                     {transaction.paymentStatus}
//                                   </Badge>
//                                 </TableCell>
//                                 <TableCell className="hidden md:table-cell">
//                                   {transaction.cost}
//                                 </TableCell>
//                                 <TableCell className="hidden md:table-cell">
//                                   {transaction.quantity}
//                                 </TableCell>
//                                 <TableCell className="hidden md:table-cell">
//                                   {transaction.createdAt}
//                                 </TableCell>
//                               </TableRow>
//                             </li>
//                           ))}
//                       </TableBody>
//                     </Table>
//                   </CardContent>
//                   <CardFooter>
//                     <div className="text-xs text-muted-foreground">
//                       Showing <strong>1-10</strong> of <strong>32</strong>{" "}
//                       products
//                     </div>
//                   </CardFooter>
//                 </Card>
//               </TabsContent>
//             </Tabs>
//           </main>
//         </div>
//       </div>
//     </TooltipProvider>
//   );
// }









// // History .......page.tsx **********************************************************************************************













// "use client"
// import { Navbar } from "../components/Navbar"
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { toast } from "react-hot-toast";



// import {
//   File,
//   Home,
//   LineChart,
//   ListFilter,
//   MoreHorizontal,
//   Package,
//   Package2,
//   PanelLeft,
//   PlusCircle,
//   Search,
//   Settings,
//   ShoppingCart,
//   Users2,
// } from "lucide-react"
// import { Badge } from "@/components/ui/badge"
// import {
//   Breadcrumb,
//   BreadcrumbItem,
//   BreadcrumbLink,
//   BreadcrumbList,
//   BreadcrumbPage,
//   BreadcrumbSeparator,
// } from "@/components/ui/breadcrumb"
// import { Button } from "@/components/ui/button"
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card"
// import {
//   DropdownMenu,
//   DropdownMenuCheckboxItem,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
// import { Input } from "@/components/ui/input"
// import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

// import { Label } from "@/components/ui/label";
// // import { filters } from "../components/filters";


// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table"
// import {
//   Tabs,
//   TabsContent,
//   TabsList,
//   TabsTrigger,
// } from "@/components/ui/tabs"
// import {
//   TooltipProvider,
//   Tooltip,
//   TooltipContent,
//   TooltipTrigger,
// } from "@/components/ui/tooltip"



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
//   const [farmerId, setfarmerId] = useState<string>("");
//   const [userId, setuserId] = useState<String>("ID");
//   const [userRole, setuserRole] = useState("nothing");

//   const [transactions, setTransactions] = useState<Transaction[]>([]);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [batchSize, setBatchSize] = useState<number>(5);
//   const [displayedTransactions, setDisplayedTransactions] = useState<number>(5);
//   const [id, setid] = useState<String>("ID");

//   const getUserDetails = async () => {
//     try {
//       const res = await axios.get("/api/users/me");
//       console.log(res.data);

//       setuserId(res.data.data._id);
//       console.log(userId);
//       setuserRole(res.data.data.role);
//       console.log(userRole);
//       //setuserId(id);
//       //console.log(userId);
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

//       console.log(userId);
//       console.log(userRole);
//       console.log(farmerId);

//       if (userRole === "manager") {
//         apiUrl += `?userId=${userId}&farmerId=${farmerId}&userRole=${userRole}`;


//       }
//       else {
//         apiUrl += `?userId=${userId}&userRole=${userRole}`;
//       }
//       console.log("api calling");
//       console.log(apiUrl);
//       const response = await axios.get(apiUrl);
//       console.log("api called");

//       setTransactions(response.data.transactions);
//     } catch (error: any) {
//       console.error("Error fetching transactions:", error.message);
//       toast.error("Error fetching transactions");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // useEffect(() => {
//   //     fetchTransactions();
//   // }, []);
//   const filterTransactions = () => {
//     const today = new Date();
//     const filteredTransactions = transactions.filter((transaction) => {
//       const transactionDate = new Date(transaction.createdAt);
//       switch (filterOption) {
//         case "today":
//           return transactionDate.toDateString() === today.toDateString();
//         case "week":
//           const startOfWeek = new Date(today);
//           startOfWeek.setDate(today.getDate() - today.getDay());
//           return transactionDate >= startOfWeek;
//         case "month":
//           return transactionDate.getMonth() === today.getMonth() && transactionDate.getFullYear() === today.getFullYear();
//         default:
//           return true;
//       }
//     });
//     return filteredTransactions;
//   };

//   const handleLoadMore = () => {
//     setDisplayedTransactions((prev) => prev + batchSize);
//   };

//   const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     setFilterOption(event.target.value);
//   };

//   const handleFarmerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setfarmerId(event.target.value);
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
//                   <TabsTrigger value="all">All</TabsTrigger>
//                   <TabsTrigger value="active">Done</TabsTrigger>
//                   <TabsTrigger value="draft">Pending</TabsTrigger>
//                 </TabsList>
//                 {userRole === "manager" && (
//                   <div>
//                     <label htmlFor="farmerId">Enter Farmer's ID:</label>
//                     <input className="mx-4" type="text" id="farmerId" value={farmerId} onChange={handleFarmerChange} />
//                     {/* <button onClick={fetchTransactions} >fetch</button> */}
//                   </div>

//                 )}
//                 <button onClick={fetchTransactions} className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">fetch</button>


//                 <div className="ml-auto flex items-center gap-2">
//                   {/* <DropdownMenu>
//                     <DropdownMenuTrigger asChild>
//                       <Button variant="outline" size="sm" className="h-8 gap-1">
//                         <ListFilter className="h-3.5 w-3.5" />
//                         <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
//                           Filter
//                         </span>
//                       </Button>
//                     </DropdownMenuTrigger>
//                     <DropdownMenuContent align="end">
//                       <DropdownMenuLabel>Filter by</DropdownMenuLabel>
//                       <DropdownMenuSeparator />
//                       <DropdownMenuCheckboxItem >
//                         Today
//                       </DropdownMenuCheckboxItem>
//                       <DropdownMenuCheckboxItem>This Week</DropdownMenuCheckboxItem>
//                       {/* <button>This</button> */}
//                   {/* <DropdownMenuCheckboxItem>
//                         This Month
//                       </DropdownMenuCheckboxItem>
//                     </DropdownMenuContent>
//                   </DropdownMenu> */}

//                   <Label htmlFor="name">Name</Label>
//                   <select id="filter" value={filterOption} onChange={handleFilterChange}  className="border border-black border-2" >
//                         <option value="all">All</option>
//                         <option value="today">Today</option>
//                         <option value="week">This Week</option>
//                         <option value="month">This Month</option>
//                     </select>
                  



//                   {/* <Button size="sm" variant="outline" className="h-8 gap-1">
//                     <File className="h-3.5 w-3.5" />
//                     <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
//                       Export
//                     </span>
//                   </Button> */}
//                   {/* <Button size="sm" className="h-8 gap-1">
//                     <PlusCircle className="h-3.5 w-3.5" />
//                     <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
//                       Add Product
//                     </span>
//                   </Button> */}
//                 </div>
//               </div>
//               <TabsContent value="all">
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
//                           {/* <TableHead className="hidden w-[100px] sm:table-cell">
//                             <span className="sr-only">Image</span>
//                           </TableHead> */}
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
//                         {/* {transactions.slice(0, displayedTransactions).map((transaction, index) => ( */}
//                         {filterTransactions().slice(0, displayedTransactions).map((transaction, index) => (
                          
//                           <li key={index} className="flex flex-row items-center mb-4">
//                             {/* <p className="mr-4">{index + 1}</p> */}

//                             <TableRow>
//                               <TableCell className="font-medium">
//                                 {transaction.farmerId}
//                               </TableCell>
//                               <TableCell>
//                                 <Badge variant="outline">{transaction.paymentStatus}</Badge>
//                               </TableCell>
//                               <TableCell className="hidden md:table-cell">
//                                 {transaction.cost}
//                               </TableCell>
//                               <TableCell className="hidden md:table-cell">
//                                 {transaction.quantity}
//                               </TableCell>
//                               <TableCell className="hidden md:table-cell">
//                                 {transaction.createdAt}
//                               </TableCell>

//                               {/* <TableCell> 
//                              <DropdownMenu>
//                               <DropdownMenuTrigger asChild>
//                                 <Button
//                                   aria-haspopup="true"
//                                   size="icon"
//                                   variant="ghost"
//                                 >
//                                   <MoreHorizontal className="h-4 w-4" />
//                                   <span className="sr-only">Toggle menu</span>
//                                 </Button>
//                               </DropdownMenuTrigger>
//                               <DropdownMenuContent align="end">
//                                 <DropdownMenuLabel>Actions</DropdownMenuLabel>
//                                 <DropdownMenuItem>Edit</DropdownMenuItem>
//                                 <DropdownMenuItem>Delete</DropdownMenuItem>
//                               </DropdownMenuContent>
//                             </DropdownMenu>
//                           </TableCell> */}

//                             </TableRow>
//                           </li>
//                         ))}

//                         {/* <TableRow>
//                           <TableCell className="hidden sm:table-cell">
//                             <Image
//                               alt="Product image"
//                               className="aspect-square rounded-md object-cover"
//                               height="64"
//                               src="/placeholder.svg"
//                               width="64"
//                             />
//                           </TableCell>
//                           <TableCell className="font-medium">
//                             Laser Lemonade Machine
//                           </TableCell>
//                           <TableCell>
//                             <Badge variant="outline">Draft</Badge>
//                           </TableCell>
//                           <TableCell className="hidden md:table-cell">
//                             $499.99
//                           </TableCell>
//                           <TableCell className="hidden md:table-cell">
//                             25
//                           </TableCell>
//                           <TableCell className="hidden md:table-cell">
//                             2023-07-12 10:42 AM
//                           </TableCell>
//                           <TableCell>
//                             <DropdownMenu>
//                               <DropdownMenuTrigger asChild>
//                                 <Button
//                                   aria-haspopup="true"
//                                   size="icon"
//                                   variant="ghost"
//                                 >
//                                   <MoreHorizontal className="h-4 w-4" />
//                                   <span className="sr-only">Toggle menu</span>
//                                 </Button>
//                               </DropdownMenuTrigger>
//                               <DropdownMenuContent align="end">
//                                 <DropdownMenuLabel>Actions</DropdownMenuLabel>
//                                 <DropdownMenuItem>Edit</DropdownMenuItem>
//                                 <DropdownMenuItem>Delete</DropdownMenuItem>
//                               </DropdownMenuContent>
//                             </DropdownMenu>
//                           </TableCell>
//                         </TableRow>
//                         <TableRow>
//                           <TableCell className="hidden sm:table-cell">
//                             <Image
//                               alt="Product image"
//                               className="aspect-square rounded-md object-cover"
//                               height="64"
//                               src="/placeholder.svg"
//                               width="64"
//                             />
//                           </TableCell>
//                           <TableCell className="font-medium">
//                             Laser Lemonade Machine
//                           </TableCell>
//                           <TableCell>
//                             <Badge variant="outline">Draft</Badge>
//                           </TableCell>
//                           <TableCell className="hidden md:table-cell">
//                             $499.99
//                           </TableCell>
//                           <TableCell className="hidden md:table-cell">
//                             25
//                           </TableCell>
//                           <TableCell className="hidden md:table-cell">
//                             2023-07-12 10:42 AM
//                           </TableCell>
//                           <TableCell>
//                             <DropdownMenu>
//                               <DropdownMenuTrigger asChild>
//                                 <Button
//                                   aria-haspopup="true"
//                                   size="icon"
//                                   variant="ghost"
//                                 >
//                                   <MoreHorizontal className="h-4 w-4" />
//                                   <span className="sr-only">Toggle menu</span>
//                                 </Button>
//                               </DropdownMenuTrigger>
//                               <DropdownMenuContent align="end">
//                                 <DropdownMenuLabel>Actions</DropdownMenuLabel>
//                                 <DropdownMenuItem>Edit</DropdownMenuItem>
//                                 <DropdownMenuItem>Delete</DropdownMenuItem>
//                               </DropdownMenuContent>
//                             </DropdownMenu>
//                           </TableCell>
//                         </TableRow>
//                         <TableRow>
//                           <TableCell className="hidden sm:table-cell">
//                             <Image
//                               alt="Product image"
//                               className="aspect-square rounded-md object-cover"
//                               height="64"
//                               src="/placeholder.svg"
//                               width="64"
//                             />
//                           </TableCell>
//                           <TableCell className="font-medium">
//                             Hypernova Headphones
//                           </TableCell>
//                           <TableCell>
//                             <Badge variant="outline">Active</Badge>
//                           </TableCell>
//                           <TableCell className="hidden md:table-cell">
//                             $129.99
//                           </TableCell>
//                           <TableCell className="hidden md:table-cell">
//                             100
//                           </TableCell>
//                           <TableCell className="hidden md:table-cell">
//                             2023-10-18 03:21 PM
//                           </TableCell>
//                           <TableCell>
//                             <DropdownMenu>
//                               <DropdownMenuTrigger asChild>
//                                 <Button
//                                   aria-haspopup="true"
//                                   size="icon"
//                                   variant="ghost"
//                                 >
//                                   <MoreHorizontal className="h-4 w-4" />
//                                   <span className="sr-only">Toggle menu</span>
//                                 </Button>
//                               </DropdownMenuTrigger>
//                               <DropdownMenuContent align="end">
//                                 <DropdownMenuLabel>Actions</DropdownMenuLabel>
//                                 <DropdownMenuItem>Edit</DropdownMenuItem>
//                                 <DropdownMenuItem>Delete</DropdownMenuItem>
//                               </DropdownMenuContent>
//                             </DropdownMenu>
//                           </TableCell>
//                         </TableRow>
//                         <TableRow>
//                           <TableCell className="hidden sm:table-cell">
//                             <Image
//                               alt="Product image"
//                               className="aspect-square rounded-md object-cover"
//                               height="64"
//                               src="/placeholder.svg"
//                               width="64"
//                             />
//                           </TableCell>
//                           <TableCell className="font-medium">
//                             AeroGlow Desk Lamp
//                           </TableCell>
//                           <TableCell>
//                             <Badge variant="outline">Active</Badge>
//                           </TableCell>
//                           <TableCell className="hidden md:table-cell">
//                             $39.99
//                           </TableCell>
//                           <TableCell className="hidden md:table-cell">
//                             50
//                           </TableCell>
//                           <TableCell className="hidden md:table-cell">
//                             2023-11-29 08:15 AM
//                           </TableCell>
//                           <TableCell>
//                             <DropdownMenu>
//                               <DropdownMenuTrigger asChild>
//                                 <Button
//                                   aria-haspopup="true"
//                                   size="icon"
//                                   variant="ghost"
//                                 >
//                                   <MoreHorizontal className="h-4 w-4" />
//                                   <span className="sr-only">Toggle menu</span>
//                                 </Button>
//                               </DropdownMenuTrigger>
//                               <DropdownMenuContent align="end">
//                                 <DropdownMenuLabel>Actions</DropdownMenuLabel>
//                                 <DropdownMenuItem>Edit</DropdownMenuItem>
//                                 <DropdownMenuItem>Delete</DropdownMenuItem>
//                               </DropdownMenuContent>
//                             </DropdownMenu>
//                           </TableCell>
//                         </TableRow>
//                         <TableRow>
//                           <TableCell className="hidden sm:table-cell">
//                             <Image
//                               alt="Product image"
//                               className="aspect-square rounded-md object-cover"
//                               height="64"
//                               src="/placeholder.svg"
//                               width="64"
//                             />
//                           </TableCell>
//                           <TableCell className="font-medium">
//                             TechTonic Energy Drink
//                           </TableCell>
//                           <TableCell>
//                             <Badge variant="secondary">Draft</Badge>
//                           </TableCell>
//                           <TableCell className="hidden md:table-cell">
//                             $2.99
//                           </TableCell>
//                           <TableCell className="hidden md:table-cell">
//                             0
//                           </TableCell>
//                           <TableCell className="hidden md:table-cell">
//                             2023-12-25 11:59 PM
//                           </TableCell>
//                           <TableCell>
//                             <DropdownMenu>
//                               <DropdownMenuTrigger asChild>
//                                 <Button
//                                   aria-haspopup="true"
//                                   size="icon"
//                                   variant="ghost"
//                                 >
//                                   <MoreHorizontal className="h-4 w-4" />
//                                   <span className="sr-only">Toggle menu</span>
//                                 </Button>
//                               </DropdownMenuTrigger>
//                               <DropdownMenuContent align="end">
//                                 <DropdownMenuLabel>Actions</DropdownMenuLabel>
//                                 <DropdownMenuItem>Edit</DropdownMenuItem>
//                                 <DropdownMenuItem>Delete</DropdownMenuItem>
//                               </DropdownMenuContent>
//                             </DropdownMenu>
//                           </TableCell>
//                         </TableRow>
//                         <TableRow>
//                           <TableCell className="hidden sm:table-cell">
//                             <Image
//                               alt="Product image"
//                               className="aspect-square rounded-md object-cover"
//                               height="64"
//                               src="/placeholder.svg"
//                               width="64"
//                             />
//                           </TableCell>
//                           <TableCell className="font-medium">
//                             Gamer Gear Pro Controller
//                           </TableCell>
//                           <TableCell>
//                             <Badge variant="outline">Active</Badge>
//                           </TableCell>
//                           <TableCell className="hidden md:table-cell">
//                             $59.99
//                           </TableCell>
//                           <TableCell className="hidden md:table-cell">
//                             75
//                           </TableCell>
//                           <TableCell className="hidden md:table-cell">
//                             2024-01-01 12:00 AM
//                           </TableCell>
//                           <TableCell>
//                             <DropdownMenu>
//                               <DropdownMenuTrigger asChild>
//                                 <Button
//                                   aria-haspopup="true"
//                                   size="icon"
//                                   variant="ghost"
//                                 >
//                                   <MoreHorizontal className="h-4 w-4" />
//                                   <span className="sr-only">Toggle menu</span>
//                                 </Button>
//                               </DropdownMenuTrigger>
//                               <DropdownMenuContent align="end">
//                                 <DropdownMenuLabel>Actions</DropdownMenuLabel>
//                                 <DropdownMenuItem>Edit</DropdownMenuItem>
//                                 <DropdownMenuItem>Delete</DropdownMenuItem>
//                               </DropdownMenuContent>
//                             </DropdownMenu>
//                           </TableCell>
//                         </TableRow> 
//                          <TableRow>
//                           <TableCell className="hidden sm:table-cell">
//                             <Image
//                               alt="Product image"
//                               className="aspect-square rounded-md object-cover"
//                               height="64"
//                               src="/placeholder.svg"
//                               width="64"
//                             />
//                           </TableCell>
//                           <TableCell className="font-medium">
//                             Luminous VR Headset
//                           </TableCell>
//                           <TableCell>
//                             <Badge variant="outline">Active</Badge>
//                           </TableCell>
//                           <TableCell className="hidden md:table-cell">
//                             $199.99
//                           </TableCell>
//                           <TableCell className="hidden md:table-cell">
//                             30
//                           </TableCell>
//                           <TableCell className="hidden md:table-cell">
//                             2024-02-14 02:14 PM
//                           </TableCell>
//                           <TableCell>
//                             <DropdownMenu>
//                               <DropdownMenuTrigger asChild>
//                                 <Button
//                                   aria-haspopup="true"
//                                   size="icon"
//                                   variant="ghost"
//                                 >
//                                   <MoreHorizontal className="h-4 w-4" />
//                                   <span className="sr-only">Toggle menu</span>
//                                 </Button>
//                               </DropdownMenuTrigger>
//                               <DropdownMenuContent align="end">
//                                 <DropdownMenuLabel>Actions</DropdownMenuLabel>
//                                 <DropdownMenuItem>Edit</DropdownMenuItem>
//                                 <DropdownMenuItem>Delete</DropdownMenuItem>
//                               </DropdownMenuContent>
//                             </DropdownMenu>
//                           </TableCell>
//                       </TableRow> */}

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
//   )
// }

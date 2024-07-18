"use client";
import { Navbar } from "../components/Navbar";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  TooltipProvider
} from "@/components/ui/tooltip";
import { FarmerInput } from "@/app/components/FarmerInput";
import { ListFilter } from "lucide-react";

interface Transaction {
  quantity: number;
  cost: number;
  paymentStatus: string;
  createdAt: string;
  farmerId: string;
  farmerName: string;
  userId: string;
}

export default function History() {
  const [filterOption, setFilterOption] = useState<string>("all");
  const [farmerId, setFarmerId] = useState<string>("");
  const [userId, setUserId] = useState<String>("ID");
  const [userRole, setUserRole] = useState("nothing");
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedTab, setSelectedTab] = useState<string>("all");

  const getUserDetails = async () => {
    try {
      const res = await axios.get("/api/users/me");
      setUserId(res.data.data._id);
      setUserRole(res.data.data.role);
    } catch (error) {
      console.error("Error fetching user details:", error);
      // toast.error("Error fetching user details. Please try again.");
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  useEffect(() => {
    fetchTransactions();
  },[farmerId, userRole, userId]);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      let apiUrl = `/api/users/Hist`;

      if (userRole === "manager") {
        apiUrl += `?userId=${userId}&farmerId=${farmerId}&userRole=${userRole}`;
      }
      else {
        apiUrl += `?userId=${userId}&userRole=${userRole}`;
      }

      const response = await axios.get(apiUrl);
      setTransactions(response.data.transactions);
    } catch (error: any) {
      console.error("Error fetching transactions:", error.message);
      // toast.error("Error fetching transactions");
    } finally {
      setLoading(false);
    }
  };


  const filterTransactions = () => {
    const today = new Date();
    return transactions.filter((transaction) => {
      const transactionDate = new Date(transaction.createdAt);
      switch (filterOption) {
        case "today":
          if (selectedTab === "all") {
            return transactionDate.toDateString() === today.toDateString();
          } else {
            return (
              transaction.paymentStatus === selectedTab &&
              transactionDate.toDateString() === today.toDateString()
            );
          }
        case "week":
          const startOfWeek = new Date(today);
          startOfWeek.setDate(today.getDate() - today.getDay());
          const endOfWeek = new Date(today);
          endOfWeek.setDate(startOfWeek.getDate() + 6); // Set end of week to 6 days after start of week
          if (selectedTab === "all") {
            return transactionDate >= startOfWeek && transactionDate <= endOfWeek;
          } else {
            return (
              transaction.paymentStatus === selectedTab &&
              transactionDate >= startOfWeek &&
              transactionDate <= endOfWeek
            );
          }

        case "month":
          if (selectedTab === "all") {
            return (transactionDate.getMonth() === today.getMonth() &&
              transactionDate.getFullYear() === today.getFullYear()
            )
          } else {
            return (
              transaction.paymentStatus === selectedTab &&
              transactionDate.getMonth() === today.getMonth() &&
              transactionDate.getFullYear() === today.getFullYear()
            );
          }

        default:
          if (selectedTab === "all") {
            return (transaction.paymentStatus === "Done" || transaction.paymentStatus === "Pending");

          } else {
            return (
              transaction.paymentStatus === selectedTab);
          }
      }
    });
  };

  const handleTabChange = (tab: string) => {
    setSelectedTab(tab);
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterOption(event.target.value);
  };

  const handleFarmerSelect = async (username: String) => {
    if (username === "") {
      setFarmerId("");
      return;
    }
    try {
      const response = await axios.get(
        `/api/users/farmerid?username=${username}`
      );
      setFarmerId(response.data.data._id);
    } catch (error) {
      console.error("Error fetching farmer ID:", error);
    }
  };

  return (
    <TooltipProvider>
      <Navbar />
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
          <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            <Tabs defaultValue="all">
              <div className="flex items-center">
                <TabsList>
                  <TabsTrigger
                    value="all"
                    onClick={() => handleTabChange("all")}
                  >
                    All
                  </TabsTrigger>
                  <TabsTrigger
                    value="Done"
                    onClick={() => handleTabChange("Done")}
                  >
                    Done
                  </TabsTrigger>
                  <TabsTrigger
                    value="Pending"
                    onClick={() => handleTabChange("Pending")}
                  >
                    Pending
                  </TabsTrigger>
                </TabsList>

                {userRole === "manager" && (
                  <div className="mx-4">
                    <FarmerInput onFarmerSelect={handleFarmerSelect} />
                  </div>
                )}

                <div className="ml-auto flex items-center gap-2">
                  <ListFilter className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Filter
                  </span>
                  <select
                    id="filter"
                    value={filterOption}
                    onChange={handleFilterChange}
                    className="border-black border-2"
                  >
                    <option value="all">All</option>
                    <option value="today">Today</option>
                    <option value="week">This Week</option>
                    <option value="month">This Month</option>
                  </select>
                </div>
              </div>

              <TabsContent value={selectedTab}>
                <Card x-chunk="dashboard-06-chunk-0">
                  <CardHeader>
                    <CardTitle>Transactions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="w-full rounded-lg border">
                      <div className="rounded-lg  border">
                        <div className="h-[626px] relative overflow-auto">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="hidden md:table-cell">
                                  Amount
                                </TableHead>
                                <TableHead className="hidden md:table-cell">
                                  Quantity
                                </TableHead>
                                <TableHead className="hidden md:table-cell">
                                  Date & Time
                                </TableHead>
                                <TableHead>
                                  <span className="sr-only">Actions</span>
                                </TableHead>
                              </TableRow>
                            </TableHeader>

                            <TableBody>
                              {filterTransactions()
                                .map((transaction, index) => (
                                  <TableRow key={index}>
                                    <TableCell className="font-medium">
                                      {transaction.farmerName}
                                    </TableCell>
                                    <TableCell>
                                      <Badge variant={transaction.paymentStatus === 'Done' ? 'green' : transaction.paymentStatus === 'Pending' ? 'yellow' : 'default'}>
                                        {transaction.paymentStatus}
                                      </Badge>
                                    </TableCell>

                                    <TableCell>
                                      {transaction.cost}
                                    </TableCell>
                                    <TableCell>
                                      {transaction.quantity}
                                    </TableCell>
                                    <TableCell>
                                      {new Date(
                                        transaction.createdAt
                                      ).toLocaleString()}
                                    </TableCell>
                                  </TableRow>
                                ))}
                            </TableBody>
                          </Table>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>
    </TooltipProvider>
  );
}

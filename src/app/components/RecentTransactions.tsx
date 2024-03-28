// "use client";
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { toast } from "react-hot-toast";

// interface Transaction {
//     // farmerId: string;
//     // managerId: string;
//     quantity: number;
//     // fat: number;
//     // snf: number;
//     cost: number;
//     paymentStatus: string;
// }

// export default function RecentTransactions() {
//     const [transactions, setTransactions] = useState<Transaction[]>([]);
//     // const [enteredCost, setEnteredCost] = useState<number>(0);
//     const [loading, setLoading] = useState<boolean>(false);

//     const fetchTransactions = async () => {
//         try {
//             setLoading(true);
//             const response = await axios.get(`/api/users/recentTransaction`);
//             setTransactions(response.data.transactions);
//         } catch (error: any) {
//             console.error("Error fetching transactions:", error.message);
//             toast.error("Error fetching transactions");
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchTransactions()
//   }, []);


//     return (
//         <div className="container">
//             <h1>Transactions</h1>
//             <div>
//                 <h2>Transaction List</h2>
//                 {/* <div>
//                     <label htmlFor="cost">Enter Cost:</label>
//                     <input 
//                         type="number" 
//                         id="cost" 
//                         value={enteredCost}
//                         onChange={(e) => setEnteredCost(parseFloat(e.target.value))}
//                     />
//                     <button onClick={fetchTransactions}>Fetch Transactions</button>
//                 </div> */}
//                 {loading ? (
//                     <p>Loading...</p>
//                 ) : (
//                     <ul>
//                         {transactions.map((transaction, index) => (
//                             <li key={index}>
//                                 {/* <p>Farmer ID: {transaction.farmerId}</p>
//                                 <p>Manager ID: {transaction.managerId}</p> */}
//                                 <p>Quantity: {transaction.quantity}</p>
//                                 {/* <p>Fat: {transaction.fat}</p>
//                                 <p>SNF: {transaction.snf}</p> */}
//                                 <p>Cost: {transaction.cost}</p>
//                                 <p>Payment Status: {transaction.paymentStatus}</p>
//                             </li>
//                         ))}
//                     </ul>
//                 )}
//             </div>
//         </div>
//     );
// }

"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

interface Transaction {
    quantity: number;
    cost: number;
    paymentStatus: string;
}

export default function RecentTransactions() {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [batchSize, setBatchSize] = useState<number>(3);
    const [displayedTransactions, setDisplayedTransactions] = useState<number>(3);

    const fetchTransactions = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`/api/users/recentTransaction`);
            setTransactions(response.data.transactions);
        } catch (error: any) {
            console.error("Error fetching transactions:", error.message);
            toast.error("Error fetching transactions");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTransactions();
    }, []);

    const handleLoadMore = () => {
        setDisplayedTransactions((prev) => prev + batchSize);
    };

    return (
        <div className="container">
            <h1>Transactions</h1>
            <div>
                <h2>Transaction List</h2>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <div>
                        <ul>
                            {transactions.slice(0, displayedTransactions).map((transaction, index) => (
                                <li key={index}>
                                    <p>Quantity: {transaction.quantity}</p>
                                    <p>Cost: {transaction.cost}</p>
                                    <p>Payment Status: {transaction.paymentStatus}</p>
                                </li>
                            ))}
                        </ul>
                        {displayedTransactions < transactions.length && (
                            <button onClick={handleLoadMore}>More</button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

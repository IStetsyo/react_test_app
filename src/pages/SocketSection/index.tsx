import { Link } from "react-router-dom";
import { useTransactions } from "../../hooks/useTransactions";

export const SocketSection = () => {
  const { transactions, transactionSum, startSocket, stopSocket, clearState } =
    useTransactions();
  return (
    <>
      <div className="bg-gray-50 p-4">
        <h1 className="text-3xl font-bold mb-4">Socket section</h1>
        <Link to="/part1" className="">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Go to part 1
          </button>
        </Link>
      </div>
      <div className="bg-gray-100 flex flex-row gap-x-4 items-center p-4">
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => startSocket()}
        >
          Start
        </button>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => stopSocket()}
        >
          Stop
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => clearState()}
        >
          Clear
        </button>
      </div>
      <div className="bg-gray-100 p-4">
        <h2 className="text-xl font-bold mb-2">Amount: {transactionSum}</h2>
      </div>
      <div className="bg-gray-50 overflow-y-auto max-h-[350px]">
        <h2 className="text-xl font-bold mb-2 mt-4">All transactions</h2>
        <table className="w-full table-auto">
          <thead>
            <tr>
              <th className="px-1 py-2">№</th>
              <th className="px-4 py-2">From</th>
              <th className="px-4 py-2">To</th>
              <th className="px-4 py-2">Amount</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => (
              <tr key={transaction.from[0]}>
                <td className="border px-1 py-2 break-all">{index + 1}.</td>
                <td className="border px-4 py-2 break-all">
                  {transaction.from}
                </td>
                <td className="border px-4 py-2 break-all">{transaction.to}</td>
                <td className="border px-4 py-2 break-all">
                  {transaction.amount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

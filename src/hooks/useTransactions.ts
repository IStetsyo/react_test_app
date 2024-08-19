import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ParsedTransaction, Transaction } from "../@types";
import { extractTransactionInfo } from "../utils/transaction";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;
export const useTransactions = () => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [transactions, setTransactions] = useState<ParsedTransaction[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const isMounted = useRef(false);

  const startSocket = useCallback(() => {
    const newSocket = new WebSocket(SOCKET_URL);
    newSocket.onopen = () => {
      setIsConnected(true);
      setSocket(newSocket);
      newSocket.send(JSON.stringify({ op: "unconfirmed_sub" }));
    };
    newSocket.onmessage = (event) => {
      const newTransaction: Transaction = JSON.parse(event.data);
      const parsed = extractTransactionInfo(newTransaction);
      setTransactions((prevTransactions) => [...prevTransactions, parsed]);
    };
    newSocket.onclose = () => {
      setIsConnected(false);
      setSocket(null);
    };
  }, []);

  const stopSocket = useCallback(() => {
    if (socket) {
      socket.send(JSON.stringify({ op: "unconfirmed_sub" }));
      socket.close();
    }
  }, [socket]);

  const clearState = useCallback(() => {
    setTransactions([]);
  }, []);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
      stopSocket();
    };
  }, [stopSocket]);

  const transactionSum = useMemo(() => {
    return transactions.reduce(
      (acc, transaction) => acc + transaction.amount,
      0
    );
  }, [transactions]);

  return {
    transactions,
    isConnected,
    transactionSum,
    startSocket,
    stopSocket,
    clearState,
  };
};

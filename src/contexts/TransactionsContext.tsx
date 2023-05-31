import { ReactNode, useCallback, useEffect, useState } from "react";
import { api } from "../lib/axios";
import { createContext } from "use-context-selector";

interface Transaction{
  id:number,
  price:number,
  description:string,
  createdAt:string,
  category:string,
  type: 'income' | 'outcome'
}

interface CreateTransactionInput{
  description: string; 
  category: string; 
  price: number; 
  type: 'income' | 'outcome';
}

interface TransactionContextType{
  transactions: Transaction[];
  fetchTransactions: (query?: string) => Promise<void>;
  createTransaction:(data: CreateTransactionInput) => Promise<void>;
}

interface TransactionProviderProps{
  children: ReactNode;
}

export const TransactionContext = createContext({}as TransactionContextType);

export function TransactionsProvider({children}:TransactionProviderProps){
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const fetchTransactions = useCallback(async(query?:string) =>{
    const response = await api.get('/transactions',{
      params: {
        _sort: 'createdAt',
        _order: 'desc',
        q: query,
      }
    })
    setTransactions(response.data);
  },[])

  const createTransaction = useCallback(async(data:CreateTransactionInput)=>{
    const { description, category, price, type} = data;

    const response = await api.post('/transactions',{
      description, 
      category, 
      price, 
      type,
      createdAt: new Date(),
    })

    setTransactions((state) => [response.data, ...state])
  },[])

  useEffect(()=>{
    fetchTransactions();
  },[fetchTransactions]);

  return (
    <TransactionContext.Provider value={{transactions, fetchTransactions, createTransaction}}>
      {children}
    </TransactionContext.Provider>
  )
}
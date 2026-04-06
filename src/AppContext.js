import React, { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // This state controls the "Role" requirement from your task
  const [userRole, setUserRole] = useState('Admin'); // Default to Admin for now
  
  // This is where your transactions will live
  const [transactions, setTransactions] = useState([
    { id: 1, date: '2026-04-01', amount: 2500, category: 'Salary', type: 'income' },
    { id: 2, date: '2026-04-02', amount: 150, category: 'Groceries', type: 'expense' },
    { id: 3, date: '2026-04-03', amount: 500, category: 'Rent', type: 'expense' },
  ]);

  return (
    <AppContext.Provider value={{ userRole, setUserRole, transactions, setTransactions }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
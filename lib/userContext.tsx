"use client";

import { createContext, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { getUserLoginData } from "@/lib/userQueryOptions";

type UserContextType = {
  user: any;
  isLoading: boolean;
  error: any;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: user, isLoading, error } = useQuery(getUserLoginData());

  return (
    <UserContext.Provider value={{ user, isLoading, error }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used inside UserProvider");
  }
  return context;
};

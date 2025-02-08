//lib\global-provider.tsx

import React, { createContext, useContext, ReactNode, useState } from "react";
import { getCurrentUser } from "./appwrite";
import { useAppwrite } from "./useAppwrite";
import { Redirect } from "expo-router";

interface GlobalContextType {
  isLogged: boolean;
  user: User | null;
  loading: boolean;
  refreshTrigger: boolean; // ✅ Add refresh state
  setRefreshTrigger: React.Dispatch<React.SetStateAction<boolean>>;
  refetch: (newParams?: Record<string, string | number>) => void;
}

interface User {
  $id: string;
  name: string;
  email: string;
  avatar: string;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

interface GlobalProviderProps {
  children: ReactNode;
}

export const GlobalProvider = ({ children }: GlobalProviderProps) => {
  const [user, setUser] = useState<User | null>(null); // ✅ Keep this
  const [refreshTrigger, setRefreshTrigger] = useState(false); // ✅ Add refresh state

  const {
    data: fetchedUser, // ✅ Renamed `user` to `fetchedUser`
    loading,
    refetch,
  } = useAppwrite({
    fn: getCurrentUser,
    params: {},
  });

  // ✅ Update `user` state whenever `fetchedUser` changes
  React.useEffect(() => {
    if (fetchedUser) {
      setUser(fetchedUser);
    }
  }, [fetchedUser]);

  const isLogged = !!user;

  return (
    <GlobalContext.Provider
      value={{
        isLogged,
        user,
        refreshTrigger, // ✅ Pass refresh state
        setRefreshTrigger, // ✅ Allow updating refresh state
        loading,
        refetch: (params) => refetch(params ?? {}),
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = (): GlobalContextType => {
  const context = useContext(GlobalContext);
  if (!context)
    throw new Error("useGlobalContext must be used within a GlobalProvider");

  return context;
};

export default GlobalProvider;

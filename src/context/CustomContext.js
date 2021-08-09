import React, { useContext, useState } from "react";

// Create context
const UserContext = React.createContext({});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState("loading fluidi...");

  return (
    <UserContext.Provider value={{ user, setUser, isLoading, setIsLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const { user, setUser } = useContext(UserContext);
  return { user, setUser };
};

export const useIsLoading = () => {
  const { isLoading, setIsLoading } = useContext(UserContext);
  return { isLoading, setIsLoading };
};

"use client";
import { createContext, useContext, useEffect, useState } from "react";

interface UserProfile {
  fullName: string;
  phone: string;
  email: string;
  username: string;
}

interface UserContextType {
  user: UserProfile | null;
  loadUser: () => void;
  registerUser: (user: UserProfile) => void;
  logout: () => void;
  loginUser: (user: any) => void;
}

const UserContext = createContext<UserContextType>({
  user: null,
  loadUser: () => {},
  registerUser: () => {},
  logout: () => {},
  loginUser: () => {},
});

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);

  const loadUser = () => {
    const stored = localStorage.getItem("userProfile");
    if (stored) setUser(JSON.parse(stored));
  };

  const registerUser = (userData: UserProfile) => {
    localStorage.setItem("userProfile", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("userProfile");
    setUser(null);
  };

  const loginUser = (user: any) => {
    setUser(user);
    localStorage.setItem("currentUser", JSON.stringify(user));
  };

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <UserContext.Provider
      value={{ user, loadUser, registerUser, logout, loginUser }}
    >
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);

"use client";
import { createContext, useContext, useEffect, useState } from "react";

interface UserProfile {
  fullName: string;
  phone: string;
  email: string;
  username: string;
  password: string;
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
    // Load existing users or empty array
    const existingUsers = JSON.parse(
      localStorage.getItem("userProfile") || "[]"
    );

    // Add the new user
    const updatedUsers = [...existingUsers, userData];

    // Save back to localStorage
    localStorage.setItem("userProfile", JSON.stringify(updatedUsers));

    // Optionally, set the logged-in user
    setUser(userData);
  };

  const loginUser = (userData: UserProfile) => {
    setUser(userData);
    // You may not need to overwrite localStorage, only keep all users array
  };

  const logout = () => {
    // localStorage.removeItem("userProfile");
    setUser(null);
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

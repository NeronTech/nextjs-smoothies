"use client";
import { createContext, useContext, useEffect, useState } from "react";

interface UserProfile {
  fullName: string;
  phone: string;
  email: string;
  username: string;
  password: string;
  address?: {
    address: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
}

interface UserContextType {
  user: UserProfile | null;
  loadUser: () => void;
  registerUser: (user: UserProfile) => void;
  logout: () => void;
  loginUser: (user: any) => void;
  saveUserAddress: (addr: {
    address: string;
    coordinates: { lat: number; lng: number };
  }) => void;
}

const UserContext = createContext<UserContextType>({
  user: null,
  loadUser: () => {},
  registerUser: () => {},
  logout: () => {},
  loginUser: () => {},
  saveUserAddress: () => {},
});

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);

  const loadUser = () => {
    const stored = localStorage.getItem("userProfile");
    if (stored) setUser(JSON.parse(stored));
  };

  const registerUser = (userData: UserProfile) => {
    // Save back to localStorage
    localStorage.setItem("userProfile", JSON.stringify(userData));

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

  const saveUserAddress = (addr: {
    address: string;
    coordinates: { lat: number; lng: number };
  }) => {
    if (!user) return;

    const updatedUser = {
      ...user,
      address: addr,
    };

    setUser(updatedUser);

    // Save back to localStorage
    localStorage.setItem("userProfile", JSON.stringify(updatedUser));
  };

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        loadUser,
        registerUser,
        logout,
        loginUser,
        saveUserAddress,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);

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
  updateUser: (updatedData: Partial<UserProfile>) => void;
  changePassword: (oldPass: string, newPass: string) => boolean;
}

const UserContext = createContext<UserContextType>({
  user: null,
  loadUser: () => {},
  registerUser: () => {},
  logout: () => {},
  loginUser: () => {},
  saveUserAddress: () => {},
  updateUser: () => {},
  changePassword: () => false,
});

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);

  const loadUser = () => {
    const stored = localStorage.getItem("userProfile");
    if (stored) setUser(JSON.parse(stored));
  };

  const updateUser = (updatedData: Partial<UserProfile>) => {
    if (!user) return;

    const updatedUser = {
      ...user,
      ...updatedData,
    };

    setUser(updatedUser);
    localStorage.setItem("userProfile", JSON.stringify(updatedUser));
  };

  const changePassword = (oldPass: string, newPass: string) => {
    if (!user) return false;
    if (user.password !== oldPass) return false;

    const updatedUser = {
      ...user,
      password: newPass,
    };

    setUser(updatedUser);
    localStorage.setItem("userProfile", JSON.stringify(updatedUser));
    return true;
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
        updateUser,
        changePassword,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);

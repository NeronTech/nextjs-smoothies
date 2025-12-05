// context/CartContext.tsx
"use client";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import Toast from "../components/Toast";
import { useRouter } from "next/navigation";
import OrderAddressModal from "../components/OrderAddressModal";
import CheckoutSummaryModal from "../components/CheckoutSummaryModal";
import PaymentModal from "../components/PaymentModal";

export interface CartItem {
  name: string;
  price: number;
  quantity: number;
  addOns?: string[];
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  increaseQuantity: (name: string) => void;
  decreaseQuantity: (name: string) => void;
  cartCount: number;
  totalPrice: number;
  isOrderModalOpen: boolean;
  openOrderModal: () => void;
  closeOrderModal: () => void;
  isSummaryModalOpen: boolean;
  openOrderSummary: () => void;
  closeOrderSummary: () => void;
  isValidationModalOpen: boolean;
  openValidationModal: () => void;
  closeValidationModal: () => void;
  isOtpModalOpen: boolean;
  openOtpModal: () => void;
  closeOtpModal: () => void;
  generateOtp: (phone: string, email?: string) => void;
  validateOtp: (input: string) => boolean;
  phone: string;
  email?: string;
  isOrderAddressModalOpen: boolean;
  openOrderAddressModal: () => void;
  closeOrderAddressModal: () => void;
  address: {
    address: string;
    coordinates: { lat: number; lng: number };
  } | null;
  saveAddress: (
    data: {
      address: string;
      coordinates: { lat: number; lng: number };
    } | null
  ) => void;
  isCheckoutSummaryModalOpen: boolean;
  openCheckoutSummary: () => void;
  closeCheckoutSummary: () => void;
  updateItemAddOns: (itemName: string, addOns: string[]) => void;
  isPaymentModalOpen: boolean;
  openPaymentModal: () => void;
  closePaymentModal: () => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isOrderModalOpen, setOrderModalOpen] = useState(false);
  const [isValidationModalOpen, setValidationModalOpen] = useState(false);
  const [isSummaryModalOpen, setSummaryModalOpen] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);
  const [isOtpModalOpen, setOtpModalOpen] = useState(false);
  const [otp, setOtp] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter();
  const [isOrderAddressModalOpen, setOrderAddressModalOpen] = useState(false);
  const [address, setAddress] = useState<{
    address: string;
    coordinates: { lat: number; lng: number };
  } | null>(null);
  const [isCheckoutSummaryModalOpen, setCheckoutSummaryModalOpen] =
    useState(false);

  const clearCart = () => setCart([]);

  // Function to show toast
  const showToast = (
    message: string,
    type: "success" | "error" = "success"
  ) => {
    setToast({ message, type });
  };

  const addToCart = (
    item: Omit<CartItem, "quantity"> & { addOns?: string[] }
  ) => {
    setCart((prev) => {
      const existing = prev.find(
        (i) =>
          i.name === item.name &&
          JSON.stringify(i.addOns || []) === JSON.stringify(item.addOns || [])
      );

      if (existing) {
        showToast(`${item.name} quantity increased`, "success");
        return prev.map((i) =>
          i === existing ? { ...i, quantity: i.quantity + 1 } : i
        );
      }

      showToast(`${item.name} added to cart`, "success");
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const updateItemAddOns = (itemName: string, addOns: string[]) => {
    setCart((prev) =>
      prev.map((i) =>
        i.name === itemName
          ? { ...i, addOns } // update add-ons only
          : i
      )
    );
  };

  const increaseQuantity = (name: string) => {
    setCart((prev) =>
      prev.map((i) => {
        if (i.name === name) showToast(`${name} quantity increased`, "success");
        return i.name === name ? { ...i, quantity: i.quantity + 1 } : i;
      })
    );
  };

  const decreaseQuantity = (name: string) => {
    setCart((prev) =>
      prev
        .map((i) => {
          if (i.name === name)
            showToast(`${name} quantity decreased`, "success");
          return i.name === name ? { ...i, quantity: i.quantity - 1 } : i;
        })
        .filter((i) => i.quantity > 0)
    );
  };

  const cartCount = cart.reduce((acc, i) => acc + i.quantity, 0);
  const totalPrice = cart.reduce((acc, i) => acc + i.price * i.quantity, 0);

  const openOrderModal = () => setOrderModalOpen(true);
  const closeOrderModal = () => setOrderModalOpen(false);

  const openOrderSummary = () => setSummaryModalOpen(true);
  const closeOrderSummary = () => setSummaryModalOpen(false);

  const openValidationModal = () => setValidationModalOpen(true);
  const closeValidationModal = () => setValidationModalOpen(false);

  const openOtpModal = () => setOtpModalOpen(true);
  const closeOtpModal = () => setOtpModalOpen(false);

  const openOrderAddressModal = () => setOrderAddressModalOpen(true);
  const closeOrderAddressModal = () => setOrderAddressModalOpen(false);

  const openCheckoutSummary = () => setCheckoutSummaryModalOpen(true);
  const closeCheckoutSummary = () => setCheckoutSummaryModalOpen(false);

  const [isPaymentModalOpen, setPaymentModalOpen] = useState(false);

  const openPaymentModal = () => setPaymentModalOpen(true);
  const closePaymentModal = () => setPaymentModalOpen(false);

  const generateOtp = (phoneInput: string, emailInput?: string) => {
    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setOtp(newOtp);
    setPhone(phoneInput);
    setEmail(emailInput || "");
    console.log("OTP sent:", newOtp, "to", phoneInput, emailInput);
  };

  const validateOtp = (input: string) => {
    if (input === otp) {
      closeOtpModal(); // Close OTP modal
      openOrderAddressModal(); // ⬅️ Show your address modal
      return true;
    }
    return false;
  };

  const saveAddress = (data: typeof address) => {
    setAddress(data);
    console.log("Saved Address:", data);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        cartCount,
        totalPrice,
        isOrderModalOpen,
        openOrderModal,
        closeOrderModal,
        isSummaryModalOpen,
        openOrderSummary,
        closeOrderSummary,
        isValidationModalOpen,
        openValidationModal,
        closeValidationModal,
        isOtpModalOpen,
        openOtpModal,
        closeOtpModal,
        generateOtp,
        validateOtp,
        phone,
        email,
        isOrderAddressModalOpen,
        openOrderAddressModal,
        closeOrderAddressModal,
        address,
        saveAddress,
        isCheckoutSummaryModalOpen,
        openCheckoutSummary,
        closeCheckoutSummary,
        updateItemAddOns,
        isPaymentModalOpen,
        openPaymentModal,
        closePaymentModal,
        clearCart,
      }}
    >
      {children}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      {isOrderAddressModalOpen && <OrderAddressModal />}
      {isCheckoutSummaryModalOpen && <CheckoutSummaryModal />}
      {isPaymentModalOpen && <PaymentModal />}
    </CartContext.Provider>
  );
};

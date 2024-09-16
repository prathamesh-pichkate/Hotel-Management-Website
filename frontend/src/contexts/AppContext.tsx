import React, { useContext, useState } from "react";
import Toast from "../components/Toast";
import { useQuery } from "react-query";
import * as apiClient from "../api-client";

// Defines the shape of the toast message
type ToastMessage = {
  message: string;
  type: "SUCCESS" | "ERROR";
};

// Defines what the context will provide (a showToast function)
type AppContext = {
  showToast: (toastMessage: ToastMessage) => void;
  isLoggedIn: boolean;
};

// Creates the context with undefined as default value (we'll assign the real value in the provider)
const AppContext = React.createContext<AppContext | undefined>(undefined);

// Provider component that wraps the app and allows access to showToast
export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [toast, setToast] = useState<ToastMessage | undefined>(undefined); // State for managing toast
  const { isError } = useQuery("validateToken", apiClient.validateToken, {
    retry: false,
  });

  return (
    <AppContext.Provider
      value={{
        showToast: (toastMessage) => {
          setToast(toastMessage); // Updates the toast state when showToast is called
        },
        isLoggedIn: !isError,
      }}
    >
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(undefined)} // Clears the toast after it's closed
        />
      )}
      {children} {/* Renders the rest of the app */}
    </AppContext.Provider>
  );
};

// Custom hook to access the context more easily
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppContextProvider");
  }
  return context;
};

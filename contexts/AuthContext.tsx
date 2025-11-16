"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  User,
  isAuthenticated as checkAuth,
  getUser,
  setUser,
  removeUser,
  setAuthToken,
  removeAuthToken,
} from "@/lib/auth";

export interface CreditHistoryItem {
  id: string;
  userId: string;
  amount: number;
  actionType: string;
  status: string;
  topUpId: string | null;
  metadata: {
    designActionId?: string;
  } | null;
  createdAt: string;
  updatedAt: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  balance: number | null;
  creditHistory: CreditHistoryItem[];
  login: (email: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const publicRoutes = ["/", "/login"];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUserState] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [balance, setBalance] = useState<number | null>(null);
  const [creditHistory, setCreditHistory] = useState<CreditHistoryItem[]>([]);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkAuthStatus = () => {
      const currentUser = getUser();
      setUserState(currentUser);
      setIsLoading(false);
    };

    checkAuthStatus();
  }, []);

  // Fetch balance and history when user is found (on mount and when user changes)
  useEffect(() => {
    if (!isLoading && user) {
      // Fetch balance and history when user is authenticated
      const fetchCreditData = async () => {
        try {
          const [balanceRes, historyRes] = await Promise.all([
            fetch("/api/balance"),
            fetch("/api/history"),
          ]);

          if (balanceRes.ok) {
            const balanceData = await balanceRes.json();
            setBalance(balanceData.data.balance);
          } else {
            setBalance(null);
          }

          if (historyRes.ok) {
            const historyData = await historyRes.json();
            setCreditHistory(historyData.data.history || []);
          } else {
            setCreditHistory([]);
          }
        } catch (error) {
          console.error("Failed to fetch credit data:", error);
          setBalance(null);
          setCreditHistory([]);
        }
      };
      fetchCreditData();
    }
  }, [isLoading, user]);

  // Redirect authenticated users away from public routes
  useEffect(() => {
    if (!isLoading) {
      const isAuthenticated = checkAuth();
      const isPublicRoute = publicRoutes.includes(pathname);

      if (isAuthenticated && isPublicRoute) {
        router.push("/home");
      }
    }
  }, [isLoading, pathname, router]);

  const login = async (email: string) => {
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Login failed");
    }

    const data = await response.json();
    const { user, token } = data;

    // Store auth data
    setAuthToken(token);
    setUser(user);
    setUserState(user);

    // Fetch balance and history after login
    try {
      const [balanceResponse, historyResponse] = await Promise.all([
        fetch("/api/balance"),
        fetch("/api/history"),
      ]);

      if (balanceResponse.ok) {
        const balanceData = await balanceResponse.json();
        setBalance(balanceData.data.balance);
      }

      if (historyResponse.ok) {
        const historyData = await historyResponse.json();
        setCreditHistory(historyData.data.history || []);
      }
    } catch (error) {
      console.error("Failed to fetch credit data:", error);
    }

    router.push("/home");
  };

  const logout = () => {
    removeAuthToken();
    removeUser();
    setUserState(null);
    setBalance(null);
    setCreditHistory([]);
    window.location.href = "/";
  };

  const isAuthenticated = checkAuth();

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated,
        balance,
        creditHistory,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

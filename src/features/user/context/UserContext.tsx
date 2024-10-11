import { ReactNode, createContext, useState } from "react";
import { User } from "../api/types";

export const UserContext = createContext<{
  user: User | null;
  fcmTokenId: number | null;
  onSignOut: () => void;
  onGetUser: (user: User) => void;
  onEditProfileDetails: (user: User) => void;
  onSubscribePushNotification: (fcmTokenId: number) => void;
  onUnsubscribePushNotification: () => void;
}>({
  user: null,
  fcmTokenId: null,
  onSignOut: () => {},
  onGetUser: () => {},
  onEditProfileDetails: () => {},
  onSubscribePushNotification: () => {},
  onUnsubscribePushNotification: () => {},
});

export function UserProvider({ children }: { children: ReactNode }) {
  const getUser = () => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
    }
    return null;
  };

  const [user, setUser] = useState<User | null>(getUser());
  const [fcmTokenId, setFcmTokenId] = useState<number | null>(null);

  const onSignOut = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("user");
    }
    setUser(null);
  };

  const onGetUser = (user: User) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("recentLoginMethod", user.provider);
    }
    setUser(user);
  };

  const onEditProfileDetails = (user: User) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("user", JSON.stringify(user));
    }
    setUser(user);
  };

  const onSubscribePushNotification = async (fcmTokenId: number) => {
    setFcmTokenId(fcmTokenId);
  };

  const onUnsubscribePushNotification = async () => {
    setFcmTokenId(null);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        fcmTokenId,
        onSignOut,
        onGetUser,
        onEditProfileDetails,
        onSubscribePushNotification,
        onUnsubscribePushNotification,
      }}>
      {children}
    </UserContext.Provider>
  );
}

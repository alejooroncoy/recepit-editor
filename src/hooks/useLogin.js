import checkPassword from "@/lib/checkPassword";
import { signOut } from "@/lib/signOut";
import { useState } from "react";

const useLogin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);

  const login = async (password) => {
    setLoading(true);

    const response = await checkPassword(password);

    setLoading(false);
    setIsLoggedIn(true);

    return response;
  };

  const logout = async () => {
    setLoading(true);

    await signOut();
    setIsLoggedIn(false);
    setLoading(false);
  };

  return { isLoggedIn, login, logout, loading };
};

export default useLogin;

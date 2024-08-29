import axios from "axios";
import { createContext, useEffect, useState } from "react";

type AuthContextProviderProps = {
  children: React.ReactNode;
};

interface User {
  username: string;
  img: string;
  password: string;
}

const url: string = process.env.SERVER_URL
  ? process.env.SERVER_URL
  : "http://localhost:8001";

// export const AuthContext = createContext(null);

export const AuthContext = createContext<{
  currentUser: User | null;
  access_token: string | null;
  login: (inputs: User) => Promise<void>;
  logout: () => Promise<void>;
}>({
  currentUser: null,
  access_token: null,
  login: async () => {},
  logout: async () => {},
});

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const userJson = localStorage.getItem("user");
    return userJson ? JSON.parse(userJson) : null;
  });

  const [access_token, setAccessToken] = useState<string | null>(() => {
    const token = localStorage.getItem("access_token");
    return token ? JSON.parse(token) : null;
  });

  const login = async (inputs: User) => {
    const res = await axios.post(`${url}/api/auths/login`, inputs);
    setCurrentUser(res.data.user);
    setAccessToken(res.data.access_token);
  };

  const logout = async () => {
    await axios.post(`${url}/api/auths/logout`);
    setCurrentUser(null);
    setAccessToken(null);
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
    localStorage.setItem("access_token", JSON.stringify(access_token));
  }, [currentUser, access_token]);

  return (
    <AuthContext.Provider value={{ currentUser, access_token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

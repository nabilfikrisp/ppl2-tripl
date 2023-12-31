import { useState, createContext } from "react";
import Cookies from "js-cookie";

export const AuthContext = createContext(null);

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (user) => {
    setUser(user);
    Cookies.set("user", JSON.stringify(user), {
      expires: 7,
      secure: true,
      sameSite: "None",
    });
    Cookies.set("token", user.token, {
      expires: 7,
      secure: true,
      sameSite: "None",
    });
  };

  const logout = () => {
    setUser(null);
    Cookies.remove("user", { secure: true, sameSite: "None" });
    Cookies.remove("token", { secure: true, sameSite: "None" });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

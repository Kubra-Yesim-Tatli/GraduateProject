import React, { createContext, useState } from "react";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setUser(userData); // Kullanıcı bilgilerini kaydet
  };

  const logout = () => {
    setUser(null); // Kullanıcı bilgilerini sıfırla
    localStorage.removeItem("authToken"); // Token'i kaldır
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;


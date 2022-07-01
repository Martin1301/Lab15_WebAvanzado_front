// localstorage no guarda objetos unicamente localStorage guarda string
// como convertimos un String a un Object
// JSON.parse("string") => object
// '{"name": "Pepe", "last_name": "Zapata", "age": 21}'

import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  // En teoria este setUser se llena cuando hacemos login
  // para que user sea la variable que usemos de forma
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || {}
  );

  const [isAuth, setIsAuth] = useState(
    JSON.parse(localStorage.getItem("isAuth")) || false
  );

  const saveUser = (user) => {
    // Si user es un objecto puedo guardarlo en localStorage?
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("isAuth", JSON.stringify(true));
    setUser(user);
    setIsAuth(true);
  };

  // Asi como tenemos una funcion que guarda la informacion en
  // localStorage deberiamos tener otra funcion para el logout
  // para limpiar el storage
  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("isAuth");
    setUser({});
    setIsAuth(false);
  };

  // Para usar esto con context necesitamos exportarlo usando el provider
  return (
    <UserContext.Provider
      value={{
        user,
        isAuth,
        saveUser,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

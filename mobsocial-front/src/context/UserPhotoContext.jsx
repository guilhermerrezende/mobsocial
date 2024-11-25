import React, { createContext, useState } from 'react';
import UserIcon from "../assets/user.svg"; // Ícone padrão

export const UserPhotoContext = createContext();

export const UserPhotoProvider = ({ children }) => {
  const [userPhoto, setUserPhoto] = useState(UserIcon);

  return (
    <UserPhotoContext.Provider value={{ userPhoto, setUserPhoto }}>
      {children}
    </UserPhotoContext.Provider>
  );
};
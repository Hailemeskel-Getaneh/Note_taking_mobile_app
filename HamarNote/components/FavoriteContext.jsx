import React, { createContext, useState } from 'react';

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (note) => {
    setFavorites((prevFavorites) => {
      const isAlreadyFavorited = prevFavorites.some(fav => fav.date === note.date);
      
      if (isAlreadyFavorited) {
        return prevFavorites.filter(fav => fav.date !== note.date); // remove from favorites
      } else {
        return [...prevFavorites, note]; 
      }
    });
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};
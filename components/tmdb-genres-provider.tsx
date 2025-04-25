"use client";

import { createContext, ReactNode, useContext } from "react";
import { TMDBGenre } from "@/lib/tmdb-types";

type TMDBGenresContextProps = {
  genresMap: Map<number, string>;
};

const TMDBGenresContext = createContext<TMDBGenresContextProps | null>(null);

type TMDBGenresProviderProps = {
  children: ReactNode;
  genres: TMDBGenre[];
};

const TMDBGenresProvider = ({ children, genres }: TMDBGenresProviderProps) => {
  const genresMap = new Map(genres.map((genre) => [genre.id, genre.name]));

  return <TMDBGenresContext.Provider value={{ genresMap }}>{children}</TMDBGenresContext.Provider>;
};

const useTMDBGenres = () => {
  const context = useContext(TMDBGenresContext);
  if (!context) {
    throw new Error("useTMDBGenres must be used within a TMDBGenresProvider");
  }
  return context;
};

export { TMDBGenresProvider, useTMDBGenres };

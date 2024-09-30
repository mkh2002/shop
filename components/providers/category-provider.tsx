"use client";

import { Category } from "@prisma/client";
import { createContext, ReactNode, useContext } from "react";

const CategoryContext = createContext<Category[] | undefined>(undefined);

export const CategoryProvider = ({
  children,
  category,
}: {
  children: ReactNode;
  category: Category[];
}) => {
  return (
    <CategoryContext.Provider value={category}>
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategoryContext = () => {
  const context = useContext(CategoryContext);

  if (!context) {
    throw new Error(
      "useCategoryContext must be used within a CategoryProvider",
    );
  }

  return context;
};

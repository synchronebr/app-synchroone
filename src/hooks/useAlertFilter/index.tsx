
import { createContext, useContext, useState, ReactNode } from "react";
import { IAlertFilterContextData } from "./types";

const AlertFilterContext = createContext({} as IAlertFilterContextData);

export function AlertFilterProvider({ children }: { children: ReactNode }) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <AlertFilterContext.Provider
      value={{
        isFilterOpen,
        setIsFilterOpen,
      }}
    >
      {children}
    </AlertFilterContext.Provider>
  );
}

export function useAlertFilter() {
  const context = useContext(AlertFilterContext);
  return context;
}

import { createContext, useContext, useState } from "react";

import { getAccessLevels as getAccessLevelsService } from "../../services/AccessLevels";
import {
  AccessLevels,
  GetAccessLevelsResponse,
} from "../../services/AccessLevels/types";

import { AccessLevelsProviderProps, IAccessLevelsContextData } from "./types";

const AccessLevelsContext = createContext({} as IAccessLevelsContextData);

export function AccessLevelsProvider({ children }: AccessLevelsProviderProps) {
  const [accessLevels, setAccessLevels] = useState<AccessLevels>(
    {} as AccessLevels
  );

  async function getAccessLevels() {
    try {
      const response = await getAccessLevelsService();
      const data = response.data as GetAccessLevelsResponse;

      setAccessLevels(data.accessLevels);
    } catch (error) {
      console.error(error);
    }
  }

  function getAccessLevelsData() {
    return accessLevels;
  }

  return (
    <AccessLevelsContext.Provider
      value={{
        getAccessLevels,
        getAccessLevelsData,
      }}
    >
      {children}
    </AccessLevelsContext.Provider>
  );
}

export function useAccessLevels() {
  const context = useContext(AccessLevelsContext);
  return context;
}

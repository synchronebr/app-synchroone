import { ReactNode } from "react";

import { AccessLevels } from "../../services/AccessLevels/types";

export type AccessLevelsProviderProps = {
  children: ReactNode;
};

export type IAccessLevelsContextData = {
  getAccessLevels(): Promise<void>;
  getAccessLevelsData(): AccessLevels;
};

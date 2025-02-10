export type AccessLevels = {
  companies: Company[];
  currentCompany: CurrentCompany;
  thirdPartyCompany: ThirdPartyCompany;
};

export type Company = {
  companyId: number;
  companyName: string;
  accessLevel: string;
  profileTypeId: number;
  type: string;
  companyType: string;
  image: string;
};

export type CurrentCompany = {
  companyId: number;
  companyName: string;
  accessLevel: string;
  profileTypeId: number;
  type: string;
  companyType: string;
};

export type GetAccessLevelsResponse = {
  accessLevels: AccessLevels;
};

export type Preference = {
  code: string;
  field: string;
  name: string;
  content: string;
};

export type ThirdPartyCompany = {
  companyId: number;
  companyName: string;
  accessLevel: string;
  profileTypeId: number;
  type: string;
  companyType: string;
};

export type UpdateCurrentCompanyRequest = {
  preferences: Preference[];
};

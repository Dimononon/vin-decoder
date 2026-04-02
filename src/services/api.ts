export interface VinDecodeResult {
  Value: string | null;
  ValueId: string | null;
  Variable: string;
  VariableId: number;
}

export interface VinDecodeResponse {
  Count: number;
  Message: string;
  SearchCriteria: string;
  Results: VinDecodeResult[];
}

export interface VariableDef {
  DataType: string;
  Description: string;
  ID: number;
  Name: string;
}

export interface VariablesResponse {
  Count: number;
  Message: string;
  SearchCriteria: string;
  Results: VariableDef[];
}

const BASE_URL = 'https://vpic.nhtsa.dot.gov/api';

export const api = {
  decodeVin: async (vin: string): Promise<VinDecodeResponse> => {
    const response = await fetch(`${BASE_URL}/vehicles/decodevin/${vin}?format=json`);
    if (!response.ok) {
      throw new Error(`Failed to decode VIN: ${response.statusText}`);
    }
    return response.json();
  },

  getVariables: async (): Promise<VariablesResponse> => {
    const response = await fetch(`${BASE_URL}/vehicles/getvehiclevariablelist?format=json`);
    if (!response.ok) {
      throw new Error(`Failed to fetch variables: ${response.statusText}`);
    }
    return response.json();
  }
};

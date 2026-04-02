/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect } from 'react';

import type { ReactNode } from 'react';
import { api } from '../services/api';
import type { VariableDef } from '../services/api';

type VariablesContextType = {
  variables: VariableDef[];
  loading: boolean;
  error: string | null;
}

export const VariablesContext = createContext<VariablesContextType>({
  variables: [],
  loading: true,
  error: null,
});

export function VariablesProvider({ children }: { children: ReactNode }) {
  const [variables, setVariables] = useState<VariableDef[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const fetchVariables = async () => {
      try {
        const response = await api.getVariables();
        if (mounted) {
          setVariables(response.Results);
        }
      } catch (err: unknown) {
        if (mounted) {
          if (err instanceof Error) {
            setError(err.message);
          } else {
            setError('Failed to fetch variables');
          }
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };
    
    fetchVariables();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <VariablesContext.Provider value={{ variables, loading, error }}>
      {children}
    </VariablesContext.Provider>
  );
}


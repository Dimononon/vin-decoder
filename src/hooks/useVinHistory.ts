import { useState } from 'react';

const HISTORY_KEY = 'vin_decoder_history';

export function useVinHistory() {
  const [history, setHistory] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(HISTORY_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      console.error('Failed to load history', e);
      return [];
    }
  });

  const addHistory = (vin: string) => {
    setHistory((prev) => {
      const filtered = prev.filter(v => v !== vin);
      const updated = [vin, ...filtered].slice(0, 3);
      try {
        localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
      } catch (e) {
        console.error('Failed to save history', e);
      }
      return updated;
    });
  };

  return { history, addHistory };
}

import { useState, useEffect } from 'react';
import { EventsOnThisDay, GeneralInfo } from '../types';

export const useFetchOnThisDayData = (isButtonVisible: boolean) => {
  const [birthdayData, setBirthdayData] = useState<GeneralInfo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    const today = new Date();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const url = `https://api.wikimedia.org/feed/v1/wikipedia/en/onthisday/all/${month}/${day}`;
    try {
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
          'Api-User-Agent': import.meta.env.VITE_API_USER_AGENT
        }
      });
      const data: EventsOnThisDay = await response.json();
      setBirthdayData(data.births);
    } catch (error) {
      setError('Failed to fetch birthday data.');
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (!isButtonVisible) {
      fetchData();
    }
  }, [isButtonVisible]);

  return { error, isLoading, birthdayData, setBirthdayData };
};

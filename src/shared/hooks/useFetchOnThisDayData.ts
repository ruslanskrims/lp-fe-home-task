import { useState } from 'react';
import { EventsOnThisDay, GeneralInfo } from '../../features/birthdays/types';
import { HttpStatusCode } from '../enums/HttpStatusCode.enum';

export const useFetchOnThisDayData = () => {
  const [birthdaysData, setBirthdaysData] = useState<GeneralInfo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
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

      if (!response.ok) {
        switch (response.status) {
          case HttpStatusCode.BadRequest:
            throw new Error(
              `HTTP Error ${response.status}: Bad Request. Please check the request parameters.`
            );
          case HttpStatusCode.NotFound:
            throw new Error(`HTTP Error ${response.status}: Resource not found.`);
          case HttpStatusCode.NotImplemented:
            throw new Error(`HTTP Error ${response.status}: Service not implemented.`);
          default:
            throw new Error(`HTTP Error: ${response.status}`);
        }
      }

      const data: EventsOnThisDay = await response.json();
      setBirthdaysData(data.births);
    } catch (error) {
      setError((error as Error).message);
    }
    setIsLoading(false);
  };

  return { error, isLoading, birthdaysData, setBirthdaysData, setError, fetchData };
};

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { User } from '../types/types';

export default function useGetUser() {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<User>();
  const { username } = useParams() as { username: string };
  const nav = useNavigate();

  useEffect(() => {
    async function fetchUser(username: string) {
      setIsLoading(true);
      try {
        const res = await axios.get(`/api/users/${username}`);
        if (res.status === 200) {
          setUser(res.data);
        } else {
          throw new Error(res.data.error);
        }
      } catch (err) {
        if (err instanceof Error) {
          nav('/404');
        }
      } finally {
        setIsLoading(false);
      }
    }
    fetchUser(username);
  }, [nav, username]);

  return { isLoading, user };
}

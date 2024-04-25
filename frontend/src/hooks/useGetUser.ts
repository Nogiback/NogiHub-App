import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { useParams } from 'react-router-dom';
import { User } from '../types/types';

export default function useGetUser() {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const { username } = useParams() as { username: string };

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
          toast.error(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    }
    fetchUser(username);
  }, [username]);

  return { isLoading, user };
}

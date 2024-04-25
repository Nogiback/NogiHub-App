import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { useParams } from 'react-router-dom';
import { User } from '../types/types';

export default function useGetFollowers() {
  const [isLoading, setIsLoading] = useState(false);
  const [followers, setFollowers] = useState<User[]>([]);
  const { username } = useParams() as { username: string };

  useEffect(() => {
    async function fetchFollowers(username: string) {
      setIsLoading(true);
      try {
        const res = await axios.get(`/api/users/${username}/followers`);
        if (res.status === 200) {
          setFollowers(res.data.followers);
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
    fetchFollowers(username);
  }, [username]);

  return { isLoading, followers };
}

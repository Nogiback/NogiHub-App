import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { User } from '../types/types';

export default function useGetFollowers() {
  const [isLoading, setIsLoading] = useState(false);
  const [followers, setFollowers] = useState<User[]>([]);
  const { username } = useParams() as { username: string };
  const nav = useNavigate();

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
          nav('/404');
        }
      } finally {
        setIsLoading(false);
      }
    }
    fetchFollowers(username);
  }, [nav, username]);

  return { isLoading, followers };
}

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { User } from '../types/types';

export default function useGetFollowing() {
  const [isLoading, setIsLoading] = useState(false);
  const [followingUsers, setFollowingUsers] = useState<User[]>([]);
  const { username } = useParams() as { username: string };
  const nav = useNavigate();

  useEffect(() => {
    async function fetchFollowing(username: string) {
      setIsLoading(true);
      try {
        const res = await axios.get(`/api/users/${username}/following`);
        if (res.status === 200) {
          setFollowingUsers(res.data.following);
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
    fetchFollowing(username);
  }, [nav, username]);

  return { isLoading, followingUsers };
}

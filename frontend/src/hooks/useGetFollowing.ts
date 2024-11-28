import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { User } from '../types/types';
import { useAuthContext } from '../context/AuthContext';

export default function useGetFollowing() {
  const [isLoading, setIsLoading] = useState(false);
  const [followingUsers, setFollowingUsers] = useState<User[]>([]);
  const { username } = useParams() as { username: string };
  const { setAuthUser } = useAuthContext();
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
          if (localStorage.getItem('authUser')) {
            setAuthUser(null);
            localStorage.removeItem('authUser');
          }
          nav('/404');
        }
      } finally {
        setIsLoading(false);
      }
    }
    fetchFollowing(username);
  }, [nav, setAuthUser, username]);

  return { isLoading, followingUsers };
}

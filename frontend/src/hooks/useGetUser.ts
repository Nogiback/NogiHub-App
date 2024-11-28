import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { User } from '../types/types';
import { useAuthContext } from '../context/AuthContext';

export default function useGetUser() {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<User>();
  const { username } = useParams() as { username: string };
  const { setAuthUser } = useAuthContext();
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
    fetchUser(username);
  }, [nav, setAuthUser, username]);

  return { isLoading, user };
}

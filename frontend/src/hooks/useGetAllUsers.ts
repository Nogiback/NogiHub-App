import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { User } from '../types/types';

export default function useGetUserPosts() {
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState<User[] | null>(null);
  const nav = useNavigate();

  useEffect(() => {
    async function fetchAllUsers() {
      setIsLoading(true);
      try {
        const res = await axios.get(`/api/users`);
        if (res.status === 200) {
          setUsers(res.data);
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
    fetchAllUsers();
  }, [nav]);

  return { isLoading, users };
}

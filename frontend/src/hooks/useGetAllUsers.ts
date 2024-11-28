import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { User } from '../types/types';
import useDebounce from './useDebounce';
import { useAuthContext } from '../context/AuthContext';

export default function useGetAllUsers() {
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState<User[] | null>(null);
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 500);
  const { setAuthUser } = useAuthContext();
  const nav = useNavigate();

  useEffect(() => {
    async function fetchAllUsers() {
      setIsLoading(true);
      try {
        const res = await axios.get(`/api/users?query=${debouncedQuery}`);
        if (res.status === 200) {
          setUsers(res.data);
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
    fetchAllUsers();
  }, [nav, debouncedQuery, setAuthUser]);

  return { isLoading, users, setQuery };
}

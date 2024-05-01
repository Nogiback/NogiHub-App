import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Post } from '../types/types';

export default function useGetUserPosts() {
  const [isLoading, setIsLoading] = useState(false);
  const [userLikes, setUserLikes] = useState<Post[] | null>(null);
  const { username } = useParams() as { username: string };
  const nav = useNavigate();

  useEffect(() => {
    async function fetchUserLikes(username: string) {
      setIsLoading(true);
      try {
        const res = await axios.get(`/api/users/${username}/likes`);
        if (res.status === 200) {
          setUserLikes(res.data);
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
    fetchUserLikes(username);
  }, [nav, username]);

  return { isLoading, userLikes };
}

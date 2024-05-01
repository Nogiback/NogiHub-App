import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Post } from '../types/types';

export default function useGetUserPosts() {
  const [isLoading, setIsLoading] = useState(false);
  const [userPosts, setUserPosts] = useState<Post[] | null>(null);
  const { username } = useParams() as { username: string };
  const nav = useNavigate();

  useEffect(() => {
    async function fetchUserPosts(username: string) {
      setIsLoading(true);
      try {
        const res = await axios.get(`/api/users/${username}/posts`);
        if (res.status === 200) {
          setUserPosts(res.data);
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
    fetchUserPosts(username);
  }, [nav, username]);

  return { isLoading, userPosts };
}

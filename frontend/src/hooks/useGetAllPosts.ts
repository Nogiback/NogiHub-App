import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Post } from '../types/types';

export default function useGetUserPosts() {
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState<Post[] | null>(null);
  const nav = useNavigate();

  useEffect(() => {
    async function fetchAllPosts() {
      setIsLoading(true);
      try {
        const res = await axios.get(`/api/posts`);
        if (res.status === 200) {
          setPosts(res.data);
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
    fetchAllPosts();
  }, [nav]);

  return { isLoading, posts };
}

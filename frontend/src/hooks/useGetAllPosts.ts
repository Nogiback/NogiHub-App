import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { Post } from '../types/types';

export default function useGetUserPosts() {
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState<Post[] | null>(null);

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
          toast.error(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    }
    fetchAllPosts();
  }, []);

  return { isLoading, posts };
}

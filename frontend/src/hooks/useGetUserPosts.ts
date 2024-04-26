import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { useParams } from 'react-router-dom';
import { Post } from '../types/types';

export default function useGetUserPosts() {
  const [isLoading, setIsLoading] = useState(false);
  const [userPosts, setUserPosts] = useState<Post[] | null>(null);
  const { username } = useParams() as { username: string };

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
          toast.error(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    }
    fetchUserPosts(username);
  }, [username]);

  return { isLoading, userPosts };
}

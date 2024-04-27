import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { useParams } from 'react-router-dom';
import { Post } from '../types/types';

export default function useGetUserPosts() {
  const [isLoading, setIsLoading] = useState(false);
  const [userLikes, setUserLikes] = useState<Post[] | null>(null);
  const { username } = useParams() as { username: string };

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
          toast.error(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    }
    fetchUserLikes(username);
  }, [username]);

  return { isLoading, userLikes };
}

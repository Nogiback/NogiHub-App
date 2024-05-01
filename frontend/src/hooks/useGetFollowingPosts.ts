import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Post } from '../types/types';

export default function useGetUserPosts() {
  const [isLoading, setIsLoading] = useState(false);
  const [followingPosts, setFollowingPosts] = useState<Post[] | null>(null);
  const nav = useNavigate();

  useEffect(() => {
    async function fetchFollowingPosts() {
      setIsLoading(true);
      try {
        const res = await axios.get(`/api/posts/following`);
        if (res.status === 200) {
          setFollowingPosts(res.data);
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
    fetchFollowingPosts();
  }, [nav]);

  return { isLoading, followingPosts };
}

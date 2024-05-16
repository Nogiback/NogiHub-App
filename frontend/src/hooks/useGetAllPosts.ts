import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Post } from '../types/types';

export default function useGetUserPosts() {
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [skip, setSkip] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const nav = useNavigate();

  useEffect(() => {
    async function fetchAllPosts() {
      setIsLoading(true);
      try {
        const res = await axios.get(`/api/posts?skip=${skip}`);
        if (res.status === 200) {
          setPosts([...posts, ...res.data.allPosts]);
          setTotalPosts(res.data.totalPosts);
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [skip]);

  return { isLoading, posts, totalPosts, setSkip };
}

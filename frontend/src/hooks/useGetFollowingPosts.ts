import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Post } from '../types/types';
import { useAuthContext } from '../context/AuthContext';

export default function useGetUserPosts() {
  const [isLoading, setIsLoading] = useState(false);
  const [followingPosts, setFollowingPosts] = useState<Post[]>([]);
  const [skip, setSkip] = useState(0);
  const [totalFollowingPosts, setTotalFollowingPosts] = useState(0);
  const { setAuthUser } = useAuthContext();
  const nav = useNavigate();

  useEffect(() => {
    async function fetchFollowingPosts() {
      setIsLoading(true);
      try {
        const res = await axios.get(`/api/posts/following?skip=${skip}`);
        if (res.status === 200) {
          setFollowingPosts([...followingPosts, ...res.data.followingPosts]);
          setTotalFollowingPosts(res.data.totalFollowingPosts);
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
    fetchFollowingPosts();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [skip]);

  return { isLoading, followingPosts, totalFollowingPosts, setSkip };
}

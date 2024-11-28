import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Post } from '../types/types';
import { useAuthContext } from '../context/AuthContext';

export default function useGetUserPosts() {
  const [isLoading, setIsLoading] = useState(false);
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [skip, setSkip] = useState(0);
  const [totalUserPosts, setTotalUserPosts] = useState(0);
  const { username } = useParams() as { username: string };
  const { setAuthUser } = useAuthContext();
  const nav = useNavigate();

  useEffect(() => {
    async function fetchUserPosts(username: string) {
      setIsLoading(true);
      try {
        const res = await axios.get(
          `/api/users/${username}/posts?skip=${skip}`,
        );
        if (res.status === 200) {
          setUserPosts([...userPosts, ...res.data.userPosts]);
          setTotalUserPosts(res.data.totalUserPosts);
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
    fetchUserPosts(username);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username, skip]);

  return { isLoading, userPosts, totalUserPosts, setSkip };
}

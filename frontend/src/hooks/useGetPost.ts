import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Post } from '../types/types';

export default function useGetPost() {
  const [isLoading, setIsLoading] = useState(false);
  const [post, setPost] = useState<Post>();
  const { postID } = useParams() as { postID: string };
  const nav = useNavigate();

  useEffect(() => {
    async function fetchPost(postID: string) {
      setIsLoading(true);
      try {
        const res = await axios.get(`/api/posts/${postID}`);
        if (res.status === 200) {
          setPost(res.data);
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
    fetchPost(postID);
  }, [nav, postID]);

  return { isLoading, post };
}

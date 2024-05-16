import { useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { Post } from '../types/types';

type Props = {
  post: Post;
  isLikedByUser: boolean;
};

export default function useLike({ post, isLikedByUser }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [isLiked, setIsLiked] = useState(isLikedByUser);
  const [likeCount, setLikeCount] = useState<number>(post.likes.length);

  async function handleLikeToggle() {
    setIsLoading(true);

    try {
      if (isLiked) {
        // Unlike the post
        const res = await axios.patch(`/api/posts/${post._id}/unlike`);
        if (res.status === 200) {
          setIsLiked(false);
          setLikeCount(likeCount - 1);
        } else {
          throw new Error(res.data.error);
        }
      } else {
        // Like the post
        const res = await axios.patch(`/api/posts/${post._id}/like`);
        if (res.status === 200) {
          setIsLiked(true);
          setLikeCount(likeCount + 1);
        } else {
          throw new Error(res.data.error);
        }
      }
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      }
    } finally {
      setIsLoading(false);
    }
  }

  return { isLoading, isLiked, likeCount, handleLikeToggle };
}

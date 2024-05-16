import { Heart } from 'lucide-react';
import { Post } from '../types/types';
import useLike from '../hooks/useLike';

type Props = {
  post: Post;
  isLikedByUser: boolean;
};

export default function LikeButton({ post, isLikedByUser }: Props) {
  const { isLoading, isLiked, likeCount, handleLikeToggle } = useLike({
    post,
    isLikedByUser,
  });

  return (
    <button
      onClick={handleLikeToggle}
      className={
        isLoading
          ? 'disabled flex items-center gap-2'
          : 'flex items-center gap-2'
      }
    >
      {isLiked ? (
        <Heart size={18} fill='red' strokeWidth={0} />
      ) : (
        <Heart size={18} />
      )}
      {likeCount}
    </button>
  );
}

import { Post } from '../../types/types';
import CommentCard from './CommentCard';

type Props = {
  post: Post;
};

export default function PostCommentsSection({ post }: Props) {
  const isComments = post.comments.length > 0;

  return (
    <>
      {isComments &&
        post.comments?.map((comment) => (
          <CommentCard key={comment._id} comment={comment} post={post} />
        ))}
    </>
  );
}

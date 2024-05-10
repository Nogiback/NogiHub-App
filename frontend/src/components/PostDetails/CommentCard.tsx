import { Comment, Post } from '../../types/types';
import { convertTimestamp } from '../../utils/convertTimestamp';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import DeleteCommentButton from './DeleteCommentButton';

type Props = {
  comment: Comment;
  post: Post;
};

export default function CommentCard({ comment, post }: Props) {
  const timestamp = convertTimestamp(comment.createdAt);
  const { authUser } = useAuthContext();

  return (
    <div className='container flex items-center gap-4 border-b border-base-300 pb-4'>
      <div className='avatar mt-2 self-start'>
        <div className='w-12 rounded-full ring ring-primary ring-offset-2 ring-offset-base-100'>
          <Link to={`/${comment.author?.username}`}>
            <img
              loading='lazy'
              src={comment.author?.profilePic}
              alt='user profile picture'
            />
          </Link>
        </div>
      </div>
      <div className='container flex flex-col gap-2'>
        <div className='flex items-center justify-between'>
          <div className='text-sm'>
            <Link
              to={`/${comment.author?.username}`}
              className='font-extrabold hover:underline'
            >
              {comment.author?.displayName}
            </Link>{' '}
            <Link
              to={`/${comment.author?.username}`}
              className='font-light text-neutral-400 hover:underline'
            >
              {`@${comment.author?.username}`}
            </Link>
            <span className='font-light text-neutral-400'>{` · `}</span>
            <span className='font-light text-neutral-400'>{timestamp}</span>
          </div>
        </div>
        <div className='flex items-center justify-start'>
          <span>{comment.content}</span>
        </div>
      </div>
      {authUser?._id === comment.author._id ? (
        <DeleteCommentButton comment={comment} post={post} />
      ) : null}
    </div>
  );
}

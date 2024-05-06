import { Trash2 } from 'lucide-react';
import { Comment } from '../../types/types';
import { convertTimestamp } from '../../utils/convertTimestamp';
import { Link } from 'react-router-dom';

type Props = {
  comment: Comment;
};

export default function CommentCard({ comment }: Props) {
  const timestamp = convertTimestamp(comment.createdAt);

  return (
    <div className='container flex gap-4 border-b border-base-300 pb-4'>
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
      <div className='container flex flex-col'>
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
          {/* TODO: DELETE BUTTON FUNCTIONALITY IF AUTH */}
          <button
            onClick={(e) => e.preventDefault()}
            className='btn btn-ghost btn-sm z-50'
          >
            <Trash2 size={18} color='red' />
          </button>
        </div>

        <div>
          <span>{comment.content}</span>
        </div>
      </div>
    </div>
  );
}

// import { Link } from 'react-router-dom';
import { Post, User } from '../types/types';
import { convertTimestamp } from '../utils/convertTimestamp';
import { Trash2 } from 'lucide-react';

type Props = {
  post: Post;
  user: User | null;
};

export default function PostCard({ post, user }: Props) {
  const timestamp = convertTimestamp(post.createdAt);

  return (
    <div className='container flex gap-4 border-b border-base-300 pb-3'>
      <div className='avatar mt-2 self-start'>
        <div className='w-12 rounded-full ring ring-primary ring-offset-2 ring-offset-base-100'>
          <img src={user?.profilePic} alt='user profile picture' />
        </div>
      </div>
      <div className='container flex flex-col'>
        <div className='flex items-center justify-between'>
          <div>
            <span className='text-sm font-extrabold'>{user?.displayName}</span>{' '}
            <span className='text-sm font-light text-neutral-400'>{`@${user?.username}`}</span>
            <span className='text-sm font-light text-neutral-400'>{` · `}</span>
            <span className='text-sm font-light text-neutral-400'>
              {timestamp}
            </span>
          </div>
          {/* TODO: DELETE BUTTON FUNCTIONALITY IF AUTH */}
          <button className='btn btn-ghost btn-sm'>
            <Trash2 size={18} color='red' />
          </button>
        </div>
        <div>
          <span>{post.content}</span>
        </div>
        <div className='mt-2'>
          {post.image && <img src={post.image} alt='post image' />}
        </div>
      </div>
    </div>
  );
}

import { Post } from '../types/types';
import { convertTimestamp } from '../utils/convertTimestamp';
import { Trash2, MessageCircle, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

type Props = {
  post: Post;
};

export default function PostCard({ post }: Props) {
  const timestamp = convertTimestamp(post.createdAt);

  return (
    <div className='container flex gap-4 border-b border-base-300 pb-3'>
      <div className='avatar mt-2 self-start'>
        <div className='w-12 rounded-full ring ring-primary ring-offset-2 ring-offset-base-100'>
          <Link to={`/${post.author?.username}`}>
            <img
              loading='lazy'
              src={post.author?.profilePic}
              alt='user profile picture'
            />
          </Link>
        </div>
      </div>
      <div className='container flex flex-col'>
        <div className='flex items-center justify-between'>
          <div className='text-sm'>
            <Link
              to={`/${post.author?.username}`}
              className='font-extrabold hover:underline'
            >
              {post.author?.displayName}
            </Link>{' '}
            <Link
              to={`/${post.author?.username}`}
              className='font-light text-neutral-400 hover:underline'
            >
              {`@${post.author?.username}`}
            </Link>
            <span className='font-light text-neutral-400'>{` · `}</span>
            <Link
              to={`/${post.author?.username}/${post._id}`}
              className='font-light text-neutral-400 hover:underline'
            >
              {timestamp}
            </Link>
          </div>
          {/* TODO: DELETE BUTTON FUNCTIONALITY IF AUTH */}
          <button
            onClick={(e) => e.preventDefault()}
            className='btn btn-ghost btn-sm z-50'
          >
            <Trash2 size={18} color='red' />
          </button>
        </div>
        <Link to={`/${post.author?.username}/${post._id}`}>
          <div>
            <span>{post.content}</span>
          </div>
          <div className='mt-2'>
            {post.image && (
              <img
                loading='lazy'
                src={post.image}
                alt='post image'
                className='rounded-lg'
              />
            )}
          </div>
        </Link>
        {/* TODO: COMMENT AND LIKE BUTTON FUNCTIONALITY */}
        <div className='container flex items-center justify-around pt-4 text-sm'>
          <div className='flex gap-2'>
            <MessageCircle size={18} />
            <span>{post.comments.length}</span>
          </div>
          <div className='flex gap-2'>
            <Heart size={18} />
            <span>{post.likes.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

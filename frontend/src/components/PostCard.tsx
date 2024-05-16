import { useAuthContext } from '../context/AuthContext';
import { Post } from '../types/types';
import { convertTimestamp } from '../utils/convertTimestamp';
import { MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import DeletePostButton from './DeletePostButton';
import LikeButton from './LikeButton';

type Props = {
  post: Post;
};

export default function PostCard({ post }: Props) {
  const { authUser } = useAuthContext();
  const timestamp = convertTimestamp(post.createdAt);
  const isLikedByUser = post.likes.includes(authUser?._id as string);

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
          {/* Delete Button if authUser === post author */}
          {authUser?._id === post.author._id ? (
            <DeletePostButton post={post} />
          ) : null}
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
        <div className='container flex items-center justify-around pt-4 text-sm'>
          <Link
            to={`/${post.author?.username}/${post._id}`}
            className='flex gap-2'
          >
            <MessageCircle size={18} />
            <span>{post.comments.length}</span>
          </Link>
          <LikeButton post={post} isLikedByUser={isLikedByUser} />
        </div>
      </div>
    </div>
  );
}

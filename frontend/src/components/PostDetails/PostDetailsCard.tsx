import { Post } from '../../types/types';
import { Trash2, MessageCircle, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import PostSkeleton from '../PostSkeleton';
import { convertExtendedTimestamp } from '../../utils/convertExtendedTimestamp';

type Props = {
  isLoading: boolean;
  post: Post;
};

export default function PostDetailsCard({ isLoading, post }: Props) {
  const timestamp = convertExtendedTimestamp(post.createdAt);

  return (
    <>
      {isLoading ? (
        <PostSkeleton />
      ) : (
        <div className='container flex flex-col gap-4 border-b border-base-300 pb-3'>
          <div className='container flex items-center justify-between gap-4'>
            <div className='flex items-center gap-4'>
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
              <div className='flex flex-col'>
                <Link
                  to={`/${post.author?.username}`}
                  className='font-extrabold hover:underline'
                >
                  {post.author?.displayName}
                </Link>
                <Link
                  to={`/${post.author?.username}`}
                  className='text-sm font-light text-neutral-400 hover:underline'
                >
                  {`@${post.author?.username}`}
                </Link>
              </div>
            </div>
            {/* TODO: DELETE BUTTON FUNCTIONALITY IF AUTH */}
            <button
              onClick={(e) => e.preventDefault()}
              className='btn btn-ghost btn-sm z-50'
            >
              <Trash2 size={18} color='red' />
            </button>
          </div>
          <div className='container flex flex-col gap-4'>
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
              <div className='mt-2'>
                <Link
                  to={`/${post.author?.username}/${post._id}`}
                  className='text-sm font-light text-neutral-400 hover:underline'
                >
                  {timestamp}
                </Link>
              </div>
            </Link>
            {/* TODO: COMMENT AND LIKE BUTTON FUNCTIONALITY */}
            <div className='container flex items-center justify-around border-t border-base-300 pt-3 text-sm'>
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
      )}
    </>
  );
}

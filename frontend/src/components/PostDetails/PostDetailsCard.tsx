import { Post } from '../../types/types';
import { MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import PostSkeleton from '../PostSkeleton';
import { convertExtendedTimestamp } from '../../utils/convertExtendedTimestamp';
import { useAuthContext } from '../../context/AuthContext';
import DeletePostButton from '../DeletePostButton';
import LikeButton from '../LikeButton';

type Props = {
  isLoading: boolean;
  post: Post;
};

export default function PostDetailsCard({ isLoading, post }: Props) {
  const { authUser } = useAuthContext();
  const timestamp = convertExtendedTimestamp(post.createdAt);
  const isLikedByUser = post.likes.includes(authUser?._id as string);

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
            {/* Delete Button if authUser === post author */}
            {authUser?._id === post.author._id ? (
              <DeletePostButton post={post} />
            ) : null}
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
            <div className='container flex items-center justify-around border-t border-base-300 pt-3 text-sm'>
              <div className='flex gap-2'>
                <MessageCircle size={18} />
                <span>{post.comments.length}</span>
              </div>
              <LikeButton post={post} isLikedByUser={isLikedByUser} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

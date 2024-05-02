import useGetUserLikes from '../../hooks/useGetUserLikes';
import PostCard from '../PostCard';
import PostSkeleton from '../PostSkeleton';

export default function UserLikedPosts() {
  const { isLoading, userLikes } = useGetUserLikes();

  return (
    <div className='container flex w-full flex-col gap-4 bg-base-100 p-4 py-4 md:w-[600px]'>
      {userLikes?.length === 0 && (
        <p className='mt-10 text-center'>No liked posts.</p>
      )}
      {isLoading ? (
        <>
          <PostSkeleton />
          <PostSkeleton />
          <PostSkeleton />
        </>
      ) : (
        userLikes?.map((post) => <PostCard key={post._id} post={post} />)
      )}
    </div>
  );
}

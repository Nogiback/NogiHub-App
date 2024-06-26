import useGetUserPosts from '../../hooks/useGetUserPosts';
import PostCard from '../PostCard';
import PostSkeleton from '../PostSkeleton';

export default function UserPosts() {
  const { isLoading, userPosts, totalUserPosts, setSkip } = useGetUserPosts();

  window.onscroll = function () {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      if (totalUserPosts === userPosts.length) return;
      setSkip(userPosts.length);
    }
  };

  return (
    <div className='container flex w-full flex-col gap-4 bg-base-100 p-4 py-4 md:w-[600px]'>
      {!isLoading && userPosts?.length === 0 && (
        <p className='mt-10 text-center'>No user posts.</p>
      )}
      {isLoading ? (
        <>
          <PostSkeleton />
          <PostSkeleton />
          <PostSkeleton />
        </>
      ) : (
        userPosts?.map((post) => <PostCard key={post._id} post={post} />)
      )}
    </div>
  );
}

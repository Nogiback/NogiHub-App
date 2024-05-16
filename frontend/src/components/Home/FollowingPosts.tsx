import useGetFollowingPosts from '../../hooks/useGetFollowingPosts';
import PostCard from '../PostCard';
import PostSkeleton from '../PostSkeleton';

export default function AllPosts() {
  const { isLoading, followingPosts, totalFollowingPosts, setSkip } =
    useGetFollowingPosts();

  window.onscroll = function () {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      if (totalFollowingPosts === followingPosts.length) return;
      setSkip(followingPosts.length);
    }
  };

  return (
    <div className='container flex w-full flex-col gap-4 bg-base-100 p-4 py-4 md:w-[600px]'>
      {!isLoading && followingPosts?.length === 0 && (
        <p className='mt-10 text-center'>No following posts!</p>
      )}
      {isLoading ? (
        <>
          <PostSkeleton />
          <PostSkeleton />
          <PostSkeleton />
        </>
      ) : (
        followingPosts?.map((post) => <PostCard key={post._id} post={post} />)
      )}
    </div>
  );
}

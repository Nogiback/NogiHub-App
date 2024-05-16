import useGetAllPosts from '../../hooks/useGetAllPosts';
import PostCard from '../PostCard';
import PostSkeleton from '../PostSkeleton';

export default function AllPosts() {
  const { isLoading, posts, totalPosts, setSkip } = useGetAllPosts();

  window.onscroll = function () {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      if (totalPosts === posts.length) return;
      setSkip(posts.length);
    }
  };

  return (
    <div className='container flex w-full flex-col gap-4 bg-base-100 p-4 py-4 md:w-[600px]'>
      {!isLoading && posts?.length === 0 && (
        <p className='mt-10 text-center'>There are no posts yet!</p>
      )}
      {isLoading ? (
        <>
          <PostSkeleton />
          <PostSkeleton />
          <PostSkeleton />
        </>
      ) : (
        posts?.map((post) => <PostCard key={post._id} post={post} />)
      )}
    </div>
  );
}

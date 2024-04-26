import useGetUser from '../hooks/useGetUser';
import useGetUserPosts from '../hooks/useGetUserPosts';
import PostCard from './PostCard';

export default function UserPosts() {
  const { isLoading, userPosts } = useGetUserPosts();
  const { user } = useGetUser();

  return (
    <div className='container flex w-full flex-col gap-4 bg-base-100 p-4 py-4 md:w-[600px]'>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        userPosts?.map((post) => (
          <PostCard key={post._id} post={post} user={user} />
        ))
      )}
    </div>
  );
}

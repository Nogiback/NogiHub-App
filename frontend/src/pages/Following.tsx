import SidebarNav from '../components/SidebarNav';
import UserCardSkeleton from '../components/UserCardSkeleton';
import UserListItem from '../components/UserListItem';
import useGetFollowing from '../hooks/useGetFollowing';

export default function Following() {
  const { isLoading, followingUsers } = useGetFollowing();

  return (
    <div className='flex w-full flex-col gap-2 p-4 sm:gap-6 sm:p-8 md:flex-row'>
      <SidebarNav />
      <div className='container flex flex-col gap-4'>
        <h1 className='text-4xl font-extrabold underline'>Following</h1>
        {isLoading ? (
          <div className='mt-6 flex flex-col gap-12'>
            <UserCardSkeleton />
            <UserCardSkeleton />
            <UserCardSkeleton />
          </div>
        ) : (
          followingUsers.map((followingUser) => (
            <UserListItem key={followingUser._id} user={followingUser} />
          ))
        )}
      </div>
    </div>
  );
}

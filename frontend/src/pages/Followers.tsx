import SidebarNav from '../components/SidebarNav';
import UserCardSkeleton from '../components/UserCardSkeleton';
import UserListItem from '../components/UserListItem';
import useGetFollowers from '../hooks/useGetFollowers';

export default function Followers() {
  const { isLoading, followers } = useGetFollowers();

  console.log(followers);

  return (
    <div className='flex w-full flex-col gap-2 p-4 sm:gap-6 sm:p-8 md:flex-row'>
      <SidebarNav />
      <div className='container flex flex-col gap-2'>
        <h1 className='text-4xl font-extrabold underline'>Followers</h1>
        {followers.map((follower) => (
          <UserListItem key={follower._id} follower={follower} />
        ))}
        {isLoading ? (
          <div className='mt-12 flex flex-col gap-12'>
            <UserCardSkeleton />
            <UserCardSkeleton />
            <UserCardSkeleton />
          </div>
        ) : null}
      </div>
    </div>
  );
}

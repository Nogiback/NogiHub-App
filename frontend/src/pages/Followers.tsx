import SidebarNav from '../components/SidebarNav';
import UserCardSkeleton from '../components/UserCardSkeleton';
import UserListItem from '../components/UserListItem';
import useGetFollowers from '../hooks/useGetFollowers';
import { useParams } from 'react-router-dom';

export default function Followers() {
  const { isLoading, followers } = useGetFollowers();
  const { username } = useParams();

  return (
    <div className='flex w-full flex-col gap-2 p-4 sm:gap-6 sm:p-8 md:flex-row'>
      <SidebarNav />
      <div className='container flex flex-col gap-4'>
        <h1 className='text-3xl font-extrabold underline'>{`${username}'s Followers`}</h1>
        {isLoading ? (
          <div className='flex flex-col gap-4'>
            <UserCardSkeleton />
            <UserCardSkeleton />
            <UserCardSkeleton />
          </div>
        ) : (
          followers.map((follower) => (
            <UserListItem key={follower._id} user={follower} />
          ))
        )}
      </div>
    </div>
  );
}

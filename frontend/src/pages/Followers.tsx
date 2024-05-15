import SidebarNav from '../components/SidebarNav';
import UserCardSkeleton from '../components/UserCardSkeleton';
import UserCard from '../components/UserCard';
import useGetFollowers from '../hooks/useGetFollowers';
import { useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';

export default function Followers() {
  const { isLoading, followers } = useGetFollowers();
  const { username } = useParams();

  return (
    <div className='flex w-full flex-col gap-2 p-4 sm:gap-6 sm:p-8 md:flex-row'>
      <SidebarNav />
      <div className='container flex flex-col gap-4'>
        <div className='flex items-center justify-start gap-4'>
          <BackButton />
          <h1 className='text-2xl font-extrabold'>{`${username}'s Followers`}</h1>
        </div>
        {!isLoading && followers?.length === 0 && (
          <p className='mt-10 text-center'>{`${username} has no followers yet!`}</p>
        )}
        {isLoading ? (
          <div className='flex flex-col gap-4'>
            <UserCardSkeleton />
            <UserCardSkeleton />
            <UserCardSkeleton />
          </div>
        ) : (
          followers.map((follower) => (
            <UserCard key={follower._id} user={follower} />
          ))
        )}
      </div>
    </div>
  );
}

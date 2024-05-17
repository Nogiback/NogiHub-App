import SidebarNav from '../components/SidebarNav';
import UserCardSkeleton from '../components/UserCardSkeleton';
import UserCard from '../components/UserCard';
import useGetFollowing from '../hooks/useGetFollowing';
import { useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import { useEffect } from 'react';

export default function Following() {
  const { isLoading, followingUsers } = useGetFollowing();
  const { username } = useParams();

  useEffect(() => window.scrollTo(0, 0), []);

  return (
    <div className='flex w-full flex-col gap-2 p-4 sm:gap-6 sm:p-8 md:flex-row'>
      <SidebarNav />
      <div className='container flex flex-col gap-4'>
        <div className='flex items-center justify-start gap-4'>
          <BackButton />
          <h1 className='text-2xl font-extrabold'>{`${username}'s Following`}</h1>
        </div>
        {!isLoading && followingUsers?.length === 0 && (
          <p className='mt-10 text-center'>{`${username} is not following anyone yet!`}</p>
        )}
        {isLoading ? (
          <div className='flex flex-col gap-4'>
            <UserCardSkeleton />
            <UserCardSkeleton />
            <UserCardSkeleton />
          </div>
        ) : (
          followingUsers.map((followingUser) => (
            <UserCard key={followingUser._id} user={followingUser} />
          ))
        )}
      </div>
    </div>
  );
}

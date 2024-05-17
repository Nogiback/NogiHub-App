import SidebarNav from '../components/SidebarNav';
import UserCardSkeleton from '../components/UserCardSkeleton';
import UserCard from '../components/UserCard';
import BackButton from '../components/BackButton';
import useGetAllUsers from '../hooks/useGetAllUsers';
import { useEffect } from 'react';

export default function AllUsers() {
  const { isLoading, users, setQuery } = useGetAllUsers();

  useEffect(() => window.scrollTo(0, 0), []);

  return (
    <div className='flex w-full flex-col gap-2 p-4 sm:gap-6 sm:p-8 md:flex-row'>
      <SidebarNav />
      <div className='container flex flex-col gap-4'>
        <div className='flex items-center justify-start gap-4'>
          <BackButton />
          <h1 className='text-2xl font-extrabold'>All Users</h1>
        </div>
        <div className='container flex w-full cursor-pointer items-center justify-center gap-4 rounded-lg bg-base-200 p-4 md:w-[550px]'>
          <input
            autoFocus
            className='input w-full'
            placeholder='Search Username...'
            type='text'
            name='search'
            onChange={(e) => setQuery(e.target.value)}
          ></input>
        </div>
        {!isLoading && users?.length === 0 && (
          <p className='container flex w-full cursor-pointer items-center justify-center gap-4 p-4 md:w-[550px]'>
            No users found.
          </p>
        )}
        {isLoading ? (
          <div className='flex flex-col gap-4'>
            <UserCardSkeleton />
            <UserCardSkeleton />
            <UserCardSkeleton />
          </div>
        ) : (
          users?.map((user) => <UserCard key={user._id} user={user} />)
        )}
      </div>
    </div>
  );
}

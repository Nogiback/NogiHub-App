import SidebarNav from '../components/SidebarNav';
import UserCardSkeleton from '../components/UserCardSkeleton';
import UserCard from '../components/UserCard';
import BackButton from '../components/BackButton';
import useGetAllUsers from '../hooks/useGetAllUsers';

export default function AllUsers() {
  const { isLoading, users } = useGetAllUsers();

  return (
    <div className='flex w-full flex-col gap-2 p-4 sm:gap-6 sm:p-8 md:flex-row'>
      <SidebarNav />
      <div className='container flex flex-col gap-4'>
        <div className='flex items-center justify-start gap-4'>
          <BackButton />
          <h1 className='text-2xl font-extrabold'>All Users</h1>
        </div>
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

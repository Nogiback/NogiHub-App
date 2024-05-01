import { useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import ProfileHeader from '../components/ProfileHeader';
import ProfilePostsToggleButtons from '../components/ProfilePostsToggleButtons';
import SidebarNav from '../components/SidebarNav';
import UserPosts from '../components/UserPosts';

export default function Profile() {
  const { username } = useParams();

  return (
    <div className='flex w-full flex-col gap-2 p-4 sm:gap-6 sm:p-8 md:flex-row'>
      <SidebarNav />
      <div className='container flex max-w-[800px] flex-col gap-2'>
        <div className='flex items-center justify-start gap-4'>
          <BackButton />
          <h1 className='text-2xl font-extrabold'>{`${username}'s Profile`}</h1>
        </div>
        <ProfileHeader />
        <ProfilePostsToggleButtons />
        <UserPosts />
      </div>
    </div>
  );
}

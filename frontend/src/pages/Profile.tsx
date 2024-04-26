import ProfileHeader from '../components/ProfileHeader';
import ProfilePostsToggleButtons from '../components/ProfilePostsToggleButtons';
import SidebarNav from '../components/SidebarNav';
import UserPosts from '../components/UserPosts';

export default function Profile() {
  return (
    <div className='flex w-full flex-col gap-2 p-4 sm:gap-6 sm:p-8 md:flex-row'>
      <SidebarNav />
      <div className='container flex max-w-[800px] flex-col'>
        <ProfileHeader />
        <ProfilePostsToggleButtons />
        <UserPosts />
      </div>
    </div>
  );
}

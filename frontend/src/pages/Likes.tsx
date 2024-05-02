import ProfileHeader from '../components/Profile/ProfileHeader';
import ProfilePostsToggleButtons from '../components/Profile/ProfilePostsToggleButtons';
import SidebarNav from '../components/SidebarNav';
import UserLikedPosts from '../components/Profile/UserLikedPosts';

export default function Likes() {
  return (
    <div className='flex w-full flex-col gap-2 p-4 sm:gap-6 sm:p-8 md:flex-row'>
      <SidebarNav />
      <div className='container flex max-w-[800px] flex-col'>
        <ProfileHeader />
        <ProfilePostsToggleButtons />
        <UserLikedPosts />
      </div>
    </div>
  );
}

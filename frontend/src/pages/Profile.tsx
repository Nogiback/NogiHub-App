import ProfileHeader from '../components/ProfileHeader';
import SidebarNav from '../components/SidebarNav';

export default function Profile() {
  return (
    <div className='flex w-full flex-col gap-2 p-4 sm:gap-6 sm:p-8 md:flex-row'>
      <SidebarNav />
      <div className='container flex flex-col'>
        <ProfileHeader />
      </div>
    </div>
  );
}

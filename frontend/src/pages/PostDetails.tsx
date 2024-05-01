import BackButton from '../components/BackButton';
import SidebarNav from '../components/SidebarNav';

export default function PostDetails() {
  return (
    <div className='flex w-full flex-col gap-2 p-4 sm:gap-6 sm:p-8 md:flex-row'>
      <SidebarNav />
      <div className='container flex max-w-[800px] flex-col'>
        <div className='flex items-center justify-start gap-4'>
          <BackButton />
          <h1 className='text-2xl font-extrabold'>Post</h1>
        </div>
      </div>
    </div>
  );
}

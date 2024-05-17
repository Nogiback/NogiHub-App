import { useEffect, useState } from 'react';
import SidebarNav from '../components/SidebarNav';
import FollowingPosts from '../components/Home/FollowingPosts';
import AllPosts from '../components/Home/AllPosts';

export default function Home() {
  const [showFollowingPosts, setShowFollowingPosts] = useState(true);
  const activeLink = 'btn btn-link btn-lg p-0 text-primary underline';
  const normalLink = 'btn btn-link btn-lg p-0 text-secondary no-underline';

  useEffect(() => window.scrollTo(0, 0), []);

  function handleShowFollowingPosts() {
    setShowFollowingPosts(true);
  }

  function handleShowAllPosts() {
    setShowFollowingPosts(false);
  }

  return (
    <div className='flex w-full flex-col gap-2 p-4 sm:gap-6 sm:p-8 md:flex-row'>
      <SidebarNav />
      <div className='container flex max-w-[800px] flex-col gap-4'>
        <div className='container flex w-full items-center justify-around border-b border-base-300 bg-base-100 md:w-[600px]'>
          <button
            onClick={handleShowAllPosts}
            className={`${!showFollowingPosts ? activeLink : normalLink}`}
          >
            All Posts
          </button>
          <button
            onClick={handleShowFollowingPosts}
            className={`${showFollowingPosts ? activeLink : normalLink}`}
          >
            Following
          </button>
        </div>
        {showFollowingPosts ? <FollowingPosts /> : <AllPosts />}
      </div>
    </div>
  );
}

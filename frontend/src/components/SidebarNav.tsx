import { Home, User, Users, Eye, LogOut, SquarePen } from 'lucide-react';
import useLogout from '../hooks/useLogout';
import ThemeToggler from './ThemeToggler';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

export default function SidebarNav() {
  const { logout } = useLogout();
  const { authUser } = useAuthContext();

  return (
    <>
      <aside className='sticky top-8 hidden h-full min-w-64 flex-col items-center space-y-4 overflow-y-auto bg-base-100 px-4 py-6 md:flex'>
        <a href='/' className='btn btn-ghost mb-4 pl-2 text-2xl font-extrabold'>
          <img alt='Logo' src='/logo.svg' className='w-10' />
          NogiHub
        </a>

        <img
          alt='Profile'
          src='https://api.dicebear.com/8.x/notionists-neutral/svg?seed=Oscar'
          className='w-32 rounded-full'
        />

        <h2 className='text-lg font-bold'>User Name</h2>

        <span className='text-sm text-accent'>username@email.com</span>

        <ul className='menu menu-lg w-full'>
          <li>
            <Link to='/' className='flex gap-4'>
              <Home />
              Home
            </Link>
          </li>
          <li>
            <Link to={`/${authUser?._id}`} className='flex gap-4'>
              <User />
              Profile
            </Link>
          </li>
          <li>
            <Link to={`/${authUser?._id}/followers`} className='flex gap-4'>
              <Users />
              Followers
            </Link>
          </li>
          <li>
            <Link to={`/${authUser?._id}/following`} className='flex gap-4'>
              <Eye />
              Following
            </Link>
          </li>
          <li>
            <a onClick={logout} className='flex gap-4'>
              <LogOut />
              Logout
            </a>
          </li>
          <li>
            <button
              onClick={() =>
                (
                  document.getElementById(
                    'post-modal',
                  ) as HTMLDialogElement | null
                )?.showModal()
              }
              className='btn btn-primary my-8'
            >
              <SquarePen />
              Post
            </button>
          </li>
          <li>
            <ThemeToggler />
          </li>
        </ul>
      </aside>

      {/* Mobile Nav */}

      <div className='navbar bg-base-200 md:hidden'>
        <div className='navbar-start'>
          <div className='dropdown'>
            <div
              tabIndex={0}
              role='button'
              className='btn btn-circle btn-ghost'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-5 w-5'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M4 6h16M4 12h16M4 18h7'
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className='menu dropdown-content menu-md z-[1] mt-3 w-52 rounded-box bg-base-200 p-2 shadow'
            >
              <li>
                <Link to='/'>Home</Link>
              </li>
              <li>
                <Link to={`/${authUser?._id}/followers`}>Followers</Link>
              </li>
              <li>
                <Link to={`/${authUser?._id}/following`}>Following</Link>
              </li>
              <li>
                <button
                  onClick={() =>
                    (
                      document.getElementById(
                        'post-modal',
                      ) as HTMLDialogElement | null
                    )?.showModal()
                  }
                >
                  Post
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div className='navbar-center'>
          <a className='flex items-center gap-2 text-xl font-bold'>
            <img alt='Logo' src='/logo.svg' className='w-8' />
            NogiHub
          </a>
        </div>
        <div className='navbar-end flex items-center gap-2'>
          <ThemeToggler />
          <div className='dropdown dropdown-end'>
            <div
              tabIndex={0}
              role='button'
              className='avatar btn btn-circle btn-ghost'
            >
              <div className='w-10 rounded-full'>
                <img
                  alt='user avatar'
                  src='https://api.dicebear.com/8.x/notionists-neutral/svg?seed=Oscar'
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className='menu dropdown-content menu-md z-[1] mt-3 w-52 rounded-box bg-base-200 p-2 shadow'
            >
              <li>
                <Link to={`/${authUser?._id}`}>Profile</Link>
              </li>
              <li>
                <Link to='/'>Settings</Link>
              </li>
              <li>
                <a onClick={logout}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

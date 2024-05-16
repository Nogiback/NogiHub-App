import {
  Home,
  User,
  Users,
  Eye,
  LogOut,
  SquarePen,
  UserSearch,
} from 'lucide-react';
import { NavLink, Link } from 'react-router-dom';
import useLogout from '../hooks/useLogout';
import { useAuthContext } from '../context/AuthContext';
import PostModal from './PostModal';

export default function SidebarNav() {
  const { logout } = useLogout();
  const { authUser } = useAuthContext();
  const activeLink = 'flex gap-4 text-primary';
  const normalLink = 'flex gap-4';

  return (
    <>
      <aside className='sticky top-8 hidden h-[calc(100vh-60px)] min-w-64 flex-col items-center justify-between space-y-4 overflow-y-auto border-r border-base-300 bg-base-100 p-4 md:flex 2xl:ml-96'>
        <div className='flex w-full flex-col gap-4'>
          <div className='flex justify-center gap-2 pr-6'>
            <a
              href='/'
              className='mb-2 flex items-center justify-center gap-2 text-2xl font-extrabold'
            >
              <img alt='Logo' src='/logo.svg' className='w-10' />
              NogiHub
            </a>
          </div>
          <ul className='menu menu-lg w-full'>
            <li>
              <NavLink
                to='/'
                className={({ isActive }) =>
                  isActive ? activeLink : normalLink
                }
              >
                <Home />
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to={`/${authUser?.username}`}
                className={({ isActive }) =>
                  isActive ? activeLink : normalLink
                }
                end
              >
                <User />
                Profile
              </NavLink>
            </li>
            <li>
              <NavLink
                to={`/${authUser?.username}/followers`}
                className={({ isActive }) =>
                  isActive ? activeLink : normalLink
                }
                end
              >
                <Users />
                Followers
              </NavLink>
            </li>
            <li>
              <NavLink
                to={`/${authUser?.username}/following`}
                className={({ isActive }) =>
                  isActive ? activeLink : normalLink
                }
                end
              >
                <Eye />
                Following
              </NavLink>
            </li>
            <li>
              <NavLink
                to={`/users`}
                className={({ isActive }) =>
                  isActive ? activeLink : normalLink
                }
                end
              >
                <UserSearch />
                Users
              </NavLink>
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
          </ul>
        </div>
        <div className='flex gap-4'>
          <Link
            to={`/${authUser?.username}`}
            className='flex items-center gap-2'
          >
            <img
              alt='Profile'
              src={authUser?.profilePic}
              className='w-12 rounded-full'
            />
            <div className='flex flex-col'>
              <h2 className='text-md font-bold'>{authUser?.displayName}</h2>
              <p className='text-sm font-light text-primary'>{`@${authUser?.username}`}</p>
            </div>
          </Link>
        </div>
      </aside>

      {/* Mobile Nav */}

      <div className='navbar sticky top-0 z-50 border-b border-base-300 bg-base-100 md:hidden'>
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
                <NavLink
                  to='/'
                  className={({ isActive }) =>
                    isActive ? activeLink : normalLink
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={`/${authUser?.username}/followers`}
                  className={({ isActive }) =>
                    isActive ? activeLink : normalLink
                  }
                  end
                >
                  Followers
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={`/${authUser?.username}/following`}
                  className={({ isActive }) =>
                    isActive ? activeLink : normalLink
                  }
                  end
                >
                  Following
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={`/users`}
                  className={({ isActive }) =>
                    isActive ? activeLink : normalLink
                  }
                  end
                >
                  Users
                </NavLink>
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
                  className='bg-primary text-base-300 hover:text-secondary'
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
          <div className='dropdown dropdown-end'>
            <div
              tabIndex={0}
              role='button'
              className='avatar btn btn-circle btn-ghost'
            >
              <div className='w-10 rounded-full'>
                <img
                  loading='lazy'
                  alt='user avatar'
                  src={authUser?.profilePic}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className='menu dropdown-content menu-md z-[1] mt-3 w-52 rounded-box bg-base-200 p-2 shadow'
            >
              <li>
                <NavLink
                  to={`/${authUser?.username}`}
                  className={({ isActive }) =>
                    isActive ? activeLink : normalLink
                  }
                  end
                >
                  Profile
                </NavLink>
              </li>
              <li>
                <a onClick={logout}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <PostModal />
    </>
  );
}

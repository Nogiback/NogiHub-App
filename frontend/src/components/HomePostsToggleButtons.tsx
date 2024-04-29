import { NavLink, useParams } from 'react-router-dom';

export default function HomePostsToggleButtons() {
  const { username } = useParams();
  const activeLink = 'btn btn-link p-0 text-primary underline';
  const normalLink = 'btn btn-link p-0 text-secondary no-underline';

  return (
    <div className='container flex w-full items-center justify-around border-b border-base-300 bg-base-100 md:w-[600px]'>
      <NavLink
        to={`/${username}`}
        className={({ isActive }) => (isActive ? activeLink : normalLink)}
        end
      >
        All Users
      </NavLink>
      <NavLink
        to={`/${username}/likes`}
        className={({ isActive }) => (isActive ? activeLink : normalLink)}
        end
      >
        Following
      </NavLink>
    </div>
  );
}

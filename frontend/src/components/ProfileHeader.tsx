import { Link } from 'react-router-dom';
import useGetUser from '../hooks/useGetUser';
import { convertDate } from '../utils/convertDate';
import FollowButton from './FollowButton';
import { FaLocationDot, FaCalendarDays } from 'react-icons/fa6';

export default function ProfileHeader() {
  const { isLoading, user } = useGetUser();
  let userJoinedDate;

  if (user) {
    userJoinedDate = convertDate(user.createdAt);
  }

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className='container flex w-full flex-col gap-4 bg-base-100 p-4 md:w-[600px]'>
          <div className='flex items-center justify-between'>
            <div className='avatar'>
              <div className='w-24 rounded-full ring ring-primary ring-offset-2 ring-offset-base-100'>
                <img src={user?.profilePic} alt='user profile picture' />
              </div>
            </div>
            <FollowButton />
          </div>
          <div className='flex flex-col'>
            <span className='text-2xl font-bold'>{user?.displayName}</span>
            <span className='text-sm text-primary'>{`@${user?.username}`}</span>
          </div>
          <span className='text-sm'>{user?.bio}</span>
          <div className='flex gap-4 text-neutral-400'>
            <span className='flex items-center gap-1 text-sm'>
              <FaLocationDot size={16} />
              {user?.location}
            </span>
            <span className='flex items-center gap-2 text-sm'>
              <FaCalendarDays size={16} />
              {`joined ${userJoinedDate}`}
            </span>
          </div>
          <div className='flex gap-4'>
            <Link
              to={`/${user?._id}/following`}
              className='flex items-center gap-1 text-sm'
            >
              <span className='font-extrabold'>{user?.following.length}</span>
              <span>Following</span>
            </Link>
            <Link
              to={`/${user?._id}/followers`}
              className='flex items-center gap-1 text-sm'
            >
              <span className='font-extrabold'>{user?.followers.length}</span>
              <span>Followers</span>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

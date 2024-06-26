import { User } from '../types/types';
import { Link } from 'react-router-dom';
import FollowButton from './FollowButton';

type Props = {
  user: User;
};

export default function UserCard({ user }: Props) {
  return (
    <Link to={`/${user.username}`} className='w-full md:w-[550px]'>
      <div className='container flex cursor-pointer items-center justify-center gap-4 rounded-lg bg-base-200 p-4'>
        <div className='avatar mt-2 self-start'>
          <div className='w-12 rounded-full ring ring-primary ring-offset-2 ring-offset-base-100'>
            <img
              loading='lazy'
              src={user.profilePic}
              alt='user profile picture'
            />
          </div>
        </div>
        <div className='container flex flex-col gap-4'>
          <div className='flex items-center justify-between'>
            <div className='flex flex-col gap-0'>
              <span className='text-lg font-bold'>{user.displayName}</span>
              <span className='text-sm text-gray-500'>{`@${user.username}`}</span>
            </div>
            <FollowButton user={user} />
          </div>
          <span className='text-sm'>{user.bio}</span>
        </div>
      </div>
    </Link>
  );
}

import { User } from '../types/types';

type Props = {
  follower: User;
};

export default function UserListItem({ follower }: Props) {
  return (
    <div className='container flex w-full items-center justify-center gap-4 rounded-lg bg-base-200 p-4 md:w-[550px]'>
      <div className='avatar mt-2 self-start'>
        <div className='w-12 rounded-full ring ring-primary ring-offset-2 ring-offset-base-100'>
          <img src={follower.profilePic} />
        </div>
      </div>
      <div className='container flex flex-col gap-4'>
        <div className='flex items-center justify-between'>
          <div className='flex flex-col gap-0'>
            <span className='text-lg font-bold'>{follower.displayName}</span>
            <span className='text-sm text-gray-500'>{`@${follower.username}`}</span>
          </div>
          <button className='btn btn-primary btn-sm'>Follow</button>
        </div>
        <span className='text-sm'>{follower.bio}</span>
      </div>
    </div>
  );
}

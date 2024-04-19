import { User } from '../types/types';

type Props = {
  follower: User;
};

export default function UserListItem({ follower }: Props) {
  return (
    <div className='container flex gap-2'>
      <div className='avatar'>
        <div className='w-12 rounded-full ring ring-primary ring-offset-2 ring-offset-base-100'>
          <img src={follower.profilePic} />
        </div>
      </div>
      <div className='container flex flex-col'>
        <div></div>
      </div>
    </div>
  );
}

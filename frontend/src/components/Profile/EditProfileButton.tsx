import { User } from '../../types/types';

type Props = {
  user: User;
};

export default function EditProfileButton({ user }: Props) {
  return <button className='btn btn-primary btn-sm '>Edit Profile</button>;
}

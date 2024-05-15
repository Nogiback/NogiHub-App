import { User } from '../../types/types';
import EditProfileModal from './EditProfileModal';

type Props = {
  user: User;
};

export default function EditProfileButton({ user }: Props) {
  return (
    <>
      <button
        onClick={() =>
          (
            document.getElementById(
              'edit-profile-modal',
            ) as HTMLDialogElement | null
          )?.showModal()
        }
        className='btn btn-primary btn-sm '
      >
        Edit Profile
      </button>
      <EditProfileModal user={user} />
    </>
  );
}

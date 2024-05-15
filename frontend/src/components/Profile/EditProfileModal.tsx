import { ChangeEvent, FormEvent, useState, useRef } from 'react';
import { User } from '../../types/types';
import useEditProfile from '../../hooks/useEditProfile';

type Props = {
  user: User;
};

export default function EditProfileModal({ user }: Props) {
  const [displayName, setDisplayName] = useState(user.displayName);
  const [bio, setBio] = useState(user.bio);
  const [location, setLocation] = useState(user.location);
  const [profilePic, setProfilePic] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(
    user.profilePic,
  );
  const { isLoading, updateProfile } = useEditProfile();
  const modalRef = useRef<HTMLDialogElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  function handleDisplayNameChange(e: ChangeEvent<HTMLInputElement>) {
    setDisplayName(e.target.value);
  }

  function handleBioChange(e: ChangeEvent<HTMLTextAreaElement>) {
    setBio(e.target.value);
  }

  function handleLocationChange(e: ChangeEvent<HTMLInputElement>) {
    setLocation(e.target.value);
  }

  function handleProfilePicChange(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;
    setProfilePic(e.target.files[0]);
    if (e.target.files.length !== 0) {
      setImagePreview(URL.createObjectURL(e.target.files[0]));
    }
  }

  // function removeImage() {
  //   if (fileRef.current) fileRef.current.value = '';
  //   setProfilePic(null);
  //   setImagePreview(null);
  // }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await updateProfile(displayName, bio, location, profilePic);
    if (fileRef.current) fileRef.current.value = '';
    if (modalRef.current) modalRef.current.close();
    window.location.reload();
  }

  return (
    <dialog id='edit-profile-modal' className='modal' ref={modalRef}>
      <div className='modal-box max-h-[80%]'>
        <form method='dialog'>
          <button className='btn btn-circle btn-ghost btn-sm absolute right-2 top-2'>
            ✕
          </button>
        </form>

        <div className='flex flex-col gap-4'>
          <h3 className='text-xl font-bold'>Edit Profile</h3>
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <div className='avatar self-center'>
              <div className='w-24 rounded-full ring ring-primary ring-offset-2 ring-offset-base-100'>
                {imagePreview && (
                  <img
                    loading='lazy'
                    src={imagePreview}
                    alt='user profile picture preview'
                  />
                )}
              </div>
            </div>
            <div className='my-2 flex gap-2'>
              <label className='flex w-full items-center gap-2'>
                <span className='btn btn-primary btn-sm'>Upload Photo</span>
                <input
                  ref={fileRef}
                  type='file'
                  className='img-input file-input file-input-bordered file-input-primary file-input-sm w-full px-2 [&::file-selector-button]:hidden'
                  accept='image/*'
                  onChange={handleProfilePicChange}
                  onClick={(e) => (e.currentTarget.value = '')}
                />
              </label>
              {/* {imagePreview && (
                <button
                  onClick={removeImage}
                  className='btn btn-primary btn-sm'
                >
                  Remove
                </button>
              )} */}
            </div>
            <label className='form-control w-full'>
              <div className='label'>
                <span className='label-text-alt'>Display Name</span>
              </div>
              <input
                name='displayName'
                type='text'
                className='input input-bordered w-full'
                value={displayName}
                onChange={handleDisplayNameChange}
              />
            </label>
            <label className='form-control w-full'>
              <div className='label'>
                <span className='label-text-alt'>Location</span>
              </div>
              <input
                name='location'
                type='text'
                className='input input-bordered w-full'
                value={location}
                onChange={handleLocationChange}
              />
            </label>
            <label className='form-control w-full'>
              <div className='label'>
                <span className='label-text-alt'>Bio</span>
              </div>
              <textarea
                name='bio'
                className='textarea textarea-bordered w-full resize-none'
                rows={4}
                onChange={handleBioChange}
                value={bio}
              ></textarea>
            </label>
            {isLoading ? (
              <span className='loading loading-spinner self-end text-primary'></span>
            ) : (
              <button type='submit' className='btn btn-primary self-end'>
                Save
              </button>
            )}
          </form>
        </div>
      </div>
    </dialog>
  );
}

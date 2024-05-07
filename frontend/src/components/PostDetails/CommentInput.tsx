import { useAuthContext } from '../../context/AuthContext';

export default function CommentInput() {
  const { authUser } = useAuthContext();
  return (
    <div className='container flex items-center gap-4 border-b border-base-300 pb-4'>
      <div className='avatar mt-2 self-start'>
        <div className='w-12 rounded-full ring ring-primary ring-offset-2 ring-offset-base-100'>
          <img
            loading='lazy'
            src={authUser?.profilePic}
            alt='user profile picture'
          />
        </div>
      </div>
      <div className='container flex'>
        <form>{/* Add comment input here */}</form>
      </div>
    </div>
  );
}

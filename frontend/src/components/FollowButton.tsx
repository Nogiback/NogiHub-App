import { MouseEvent, useState } from 'react';
import { User } from '../types/types';
import { useAuthContext } from '../context/AuthContext';
import useFollow from '../hooks/useFollow';
import useUnfollow from '../hooks/useUnfollow';

type Props = {
  user: User;
};

export default function FollowButton({ user }: Props) {
  const { authUser } = useAuthContext();
  const { followLoading, followUser } = useFollow();
  const { unfollowLoading, unfollowUser } = useUnfollow();
  const [isFollowing, setIsFollowing] = useState(() => {
    if (authUser && user?.followers.includes(authUser._id)) {
      return true;
    } else {
      return false;
    }
  });

  async function handleFollowToggle(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (isFollowing) {
      await unfollowUser(user);
    } else {
      await followUser(user);
    }
    setIsFollowing(isFollowing ? false : true);
  }

  return (
    <>
      {followLoading && (
        <button
          onClick={handleFollowToggle}
          className='btn disabled btn-primary btn-sm w-[80px]'
        >
          <span className='loading loading-spinner'></span>
        </button>
      )}

      {unfollowLoading && (
        <button
          onClick={handleFollowToggle}
          className='btn disabled btn-primary btn-sm w-[80px]'
        >
          <span className='loading loading-spinner'></span>
        </button>
      )}

      {!followLoading && !unfollowLoading && (
        <button
          onClick={handleFollowToggle}
          className='btn btn-primary btn-sm w-[80px]'
        >
          {isFollowing ? 'Unfollow' : 'Follow'}
        </button>
      )}
    </>
  );
}

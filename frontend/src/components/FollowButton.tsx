import { MouseEvent } from 'react';

export default function FollowButton() {
  function handleClick(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
  }
  return (
    <button onClick={handleClick} className='btn btn-primary btn-sm'>
      Follow
    </button>
  );
}

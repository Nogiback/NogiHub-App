import { useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { User } from '../types/types';

export default function useUnfollow() {
  const [unfollowLoading, setUnfollowLoading] = useState(false);

  async function unfollowUser(user: User) {
    setUnfollowLoading(true);
    try {
      // API call to unfollow user
      const res = await axios.patch(`/api/users/remove/${user._id}`);
      if (res.status === 200) {
        toast.success(`You have unfollowed ${user.username}.`);
      } else {
        throw new Error(res.data.error);
      }
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      }
    } finally {
      setUnfollowLoading(false);
    }
  }

  return { unfollowLoading, unfollowUser };
}

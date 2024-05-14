import { useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { User } from '../types/types';

export default function useFollow() {
  const [followLoading, setFollowLoading] = useState(false);

  async function followUser(user: User) {
    setFollowLoading(true);
    try {
      // API call to follow user
      const res = await axios.patch(`/api/users/add/${user._id}`);
      if (res.status === 200) {
        toast.success(`You are now following ${user.username}.`);
      } else {
        throw new Error(res.data.error);
      }
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      }
    } finally {
      setFollowLoading(false);
    }
  }

  return { followLoading, followUser };
}

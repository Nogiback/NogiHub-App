import { useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';

export default function useGetFollowing() {
  const [isLoading, setIsLoading] = useState(false);

  async function fetchFollowing(userID: string) {
    setIsLoading(true);
    try {
      const res = await axios.post(`/api/users/${userID}/following`);
      if (res.status === 200) {
        return res.data.following;
      } else {
        throw new Error(res.data.error);
      }
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      }
    } finally {
      setIsLoading(false);
    }
  }

  return { isLoading, fetchFollowing };
}

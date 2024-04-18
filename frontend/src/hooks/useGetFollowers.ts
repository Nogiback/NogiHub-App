import { useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';

export default function useLogout() {
  const [isLoading, setIsLoading] = useState(false);

  async function fetchFollowers(userID: string) {
    setIsLoading(true);
    try {
      const res = await axios.post(`/api/users/${userID}/followers`);
      if (res.status === 200) {
        return res.data.followers;
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

  return { isLoading, fetchFollowers };
}

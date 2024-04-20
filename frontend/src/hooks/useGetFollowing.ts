import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { useParams } from 'react-router-dom';
import { User } from '../types/types';

export default function useGetFollowing() {
  const [isLoading, setIsLoading] = useState(false);
  const [followingUsers, setFollowingUsers] = useState<User[]>([]);
  const { userID } = useParams() as { userID: string };

  useEffect(() => {
    async function fetchFollowing(userID: string) {
      setIsLoading(true);
      try {
        const res = await axios.get(`/api/users/${userID}/following`);
        if (res.status === 200) {
          setFollowingUsers(res.data.following);
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
    fetchFollowing(userID);
  }, [userID]);

  return { isLoading, followingUsers };
}

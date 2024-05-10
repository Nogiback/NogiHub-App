import { useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';

export default function useDeletePost() {
  const [isLoading, setIsLoading] = useState(false);

  async function deletePost(postID: string) {
    setIsLoading(true);
    try {
      // API call to delete post
      const res = await axios.delete(`/api/posts/${postID}/delete`);
      if (res.status === 200) {
        toast.success('Post successfully deleted.');
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

  return { isLoading, deletePost };
}

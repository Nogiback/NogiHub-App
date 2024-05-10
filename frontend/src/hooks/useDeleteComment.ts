import { useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';

export default function useDeleteComment() {
  const [isLoading, setIsLoading] = useState(false);

  async function deleteComment(commentID: string, postID: string) {
    setIsLoading(true);
    try {
      // API call to delete comment
      const res = await axios.delete(
        `/api/posts/${postID}/comments/${commentID}/delete`,
      );
      if (res.status === 200) {
        toast.success('Comment successfully deleted.');
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

  return { isLoading, deleteComment };
}

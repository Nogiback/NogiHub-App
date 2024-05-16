import { useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';

export default function useComment() {
  const [isLoading, setIsLoading] = useState(false);

  async function submitComment(content: string, postID: string) {
    setIsLoading(true);

    try {
      const commentData = {
        content: content,
      };
      // API call to submit comment
      await axios.post(`/api/posts/${postID}/comment`, commentData);
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      }
    } finally {
      setIsLoading(false);
    }
  }

  return { isLoading, submitComment };
}

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
      const res = await axios.post(`/api/posts/${postID}/comment`, commentData);
      if (res.status === 200) {
        toast.success('Comment successfully posted.');
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

  return { isLoading, submitComment };
}

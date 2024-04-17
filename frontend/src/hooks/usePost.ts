import { useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';

export default function usePost() {
  const [isLoading, setIsLoading] = useState(false);
  const UPLOAD_PRESET: string = import.meta.env.VITE_UPLOAD_PRESET;
  const CLOUD_NAME: string = import.meta.env.VITE_CLOUD_NAME;

  async function submitPost(content: string, postImage: File | null) {
    setIsLoading(true);

    try {
      let imageURL;

      // Cloudinary image upload
      if (postImage && postImage.type.includes('image')) {
        const image = new FormData();
        image.append('file', postImage);
        image.append('cloud_name', CLOUD_NAME);
        image.append('upload_preset', UPLOAD_PRESET);

        const res = await axios.post(
          'https://api.cloudinary.com/v1_1/nogihub/image/upload',
          image,
        );
        imageURL = res.data.url;
      }
      const postData = {
        content: content,
        image: imageURL,
      };

      // API call to submit user's post
      const res = await axios.post('/api/posts/post', postData);
      if (res.status === 200) {
        toast.success('Post successfully submitted.');
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

  return { isLoading, submitPost };
}

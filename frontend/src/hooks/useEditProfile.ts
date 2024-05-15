import { useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { useAuthContext } from '../context/AuthContext';

export default function useEditProfile() {
  const { setAuthUser } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const UPLOAD_PRESET: string = import.meta.env.VITE_UPLOAD_PRESET;
  const CLOUD_NAME: string = import.meta.env.VITE_CLOUD_NAME;

  async function updateProfile(
    displayName: string,
    bio: string,
    location: string,
    profilePic: File | null,
  ) {
    setIsLoading(true);

    try {
      let imageURL;

      // Cloudinary image upload
      if (profilePic && profilePic.type.includes('image')) {
        const image = new FormData();
        image.append('file', profilePic);
        image.append('cloud_name', CLOUD_NAME);
        image.append('upload_preset', UPLOAD_PRESET);

        const res = await axios.post(
          'https://api.cloudinary.com/v1_1/nogihub/image/upload',
          image,
        );

        imageURL = res.data.url;
      } else {
        imageURL = '';
      }

      const updatedProfileData = {
        displayName: displayName,
        bio: bio,
        location: location,
        profilePic: imageURL,
      };

      // API call to submit user's profile changes
      const res = await axios.patch('/api/users/update', updatedProfileData);
      if (res.status === 200) {
        toast.success('You have successfully updated your profile.');

        // Re-authorizing the current user to update info in authUser
        localStorage.setItem('authUser', JSON.stringify(res.data));
        setAuthUser(res.data);
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

  return { isLoading, updateProfile };
}

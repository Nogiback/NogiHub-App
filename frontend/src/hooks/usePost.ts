// import { useState } from 'react';
// import axios from 'axios';
// import { toast } from 'sonner';
// import { useAuthContext } from '../context/AuthContext';

// export default function usePost() {
//   const [isLoading, setIsLoading] = useState(false);
//   const { setAuthUser } = useAuthContext();

//   async function submitPost(formData: SignupFormData) {
//     const isValid = handleInputErrors(formData);
//     if (!isValid) return;
//     setIsLoading(true);

//     try {
//       const res = await axios.post('/api/auth/signup', formData);
//       if (res.status === 201) {
//         toast.success('Account successfully created.');
//       } else {
//         throw new Error(res.data);
//       }
//       localStorage.setItem('authUser', JSON.stringify(res.data));
//       setAuthUser(res.data);
//     } catch (err) {
//       if (err instanceof AxiosError) {
//         toast.error(err.response?.data.message);
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   }

//   return { isLoading, signupUser };
// }

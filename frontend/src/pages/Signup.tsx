import { FlameKindling } from 'lucide-react';
import { ChangeEvent, FormEvent, useState } from 'react';
import useSignup from '../hooks/useSignup';

export default function Signup() {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    location: '',
    bio: '',
    password: '',
    confirmPassword: '',
  });
  const { isLoading, signupUser } = useSignup();

  function handleFormChange(
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
  ) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await signupUser(formData);
  }

  return (
    <div className='flex items-center justify-center'>
      <div className='flex h-screen w-screen flex-col items-center justify-center gap-4 overflow-hidden rounded-lg bg-base-300 bg-clip-padding p-8 shadow-xl backdrop-blur-xl'>
        <FlameKindling size={42} color='#F66B0E' />
        <h3 className='text-center text-4xl font-bold'>Welcome to NogiHub</h3>
        <p>Sign up below to join the community!</p>
        <form
          className='flex w-full flex-col gap-4 sm:w-[500px]'
          onSubmit={handleSubmit}
        >
          <input
            name='email'
            type='text'
            className='input input-bordered w-full'
            placeholder='Email*'
            value={formData.email}
            onChange={handleFormChange}
          />
          <input
            name='username'
            type='text'
            className='input input-bordered w-full'
            placeholder='Username*'
            value={formData.username}
            onChange={handleFormChange}
          />
          <input
            name='location'
            type='text'
            className='input input-bordered w-full'
            placeholder='Location'
            value={formData.location}
            onChange={handleFormChange}
          />
          <textarea
            name='bio'
            rows={5}
            className='textarea textarea-bordered w-full'
            placeholder='Bio'
            value={formData.bio}
            onChange={handleFormChange}
          />
          <input
            name='password'
            type='password'
            className='input input-bordered w-full'
            placeholder='Password*'
            value={formData.password}
            onChange={handleFormChange}
          />
          <input
            name='confirmPassword'
            type='password'
            className='input input-bordered w-full'
            placeholder='Confirm Password*'
            value={formData.confirmPassword}
            onChange={handleFormChange}
          />
          <button
            type='submit'
            className='btn btn-primary'
            disabled={isLoading}
          >
            {isLoading ? (
              <span className='loading loading-spinner loading-md'></span>
            ) : (
              'Submit'
            )}
          </button>
        </form>
        <div className='flex items-center gap-2'>
          <p>Already a member?</p>
          <a className='link-hover link link-primary' href='/login'>
            Log in here.
          </a>
        </div>
      </div>
    </div>
  );
}

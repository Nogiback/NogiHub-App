import { ChangeEvent, FormEvent, useState, useRef } from 'react';
import usePost from '../hooks/usePost';

export default function PostModal() {
  const [content, setContent] = useState('');
  const [postImage, setPostImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { isLoading, submitPost } = usePost();
  const fileRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDialogElement>(null);

  function handleContentChange(e: ChangeEvent<HTMLTextAreaElement>) {
    setContent(e.target.value);
  }

  function handleImageChange(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;
    setPostImage(e.target.files[0]);
    if (e.target.files.length !== 0) {
      setImagePreview(URL.createObjectURL(e.target.files[0]));
    }
  }

  function removeImage() {
    if (fileRef.current) fileRef.current.value = '';
    setPostImage(null);
    setImagePreview(null);
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await submitPost(content, postImage);
    if (fileRef.current) fileRef.current.value = '';
    setImagePreview(null);
    setPostImage(null);
    setContent('');
    if (modalRef.current) modalRef.current.close();
  }

  return (
    <dialog id='post-modal' className='modal' ref={modalRef}>
      <div className='modal-box max-h-[80%]'>
        <form method='dialog'>
          <button className='btn btn-circle btn-ghost btn-sm absolute right-2 top-2'>
            ✕
          </button>
        </form>

        <div className='flex flex-col gap-2'>
          <h3 className='text-xl font-bold'>Post</h3>
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <textarea
              className='textarea textarea-bordered w-full'
              rows={4}
              placeholder={`What's on your mind?!`}
              onChange={handleContentChange}
              value={content}
            ></textarea>
            <div className='flex gap-2'>
              <input
                ref={fileRef}
                type='file'
                className='img-input file-input file-input-bordered file-input-primary file-input-sm w-full'
                accept='image/*'
                onChange={handleImageChange}
                onClick={(e) => (e.currentTarget.value = '')}
              />
              {imagePreview && (
                <button
                  onClick={removeImage}
                  className='btn btn-primary btn-sm'
                >
                  Remove
                </button>
              )}
            </div>
            <div className='w-full'>
              {imagePreview && (
                <img
                  className='w-full'
                  src={imagePreview && imagePreview}
                  alt='user image upload'
                />
              )}
            </div>
            {isLoading ? (
              <span className='loading loading-spinner self-end text-primary'></span>
            ) : (
              <button type='submit' className='btn btn-primary self-end'>
                Submit Post
              </button>
            )}
          </form>
        </div>
      </div>
    </dialog>
  );
}
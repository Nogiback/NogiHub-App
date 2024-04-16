import {
  ChangeEvent,
  FormEvent,
  useState,
  useRef,
  ReactEventHandler,
  MouseEventHandler,
} from 'react';

export default function PostModal() {
  const [content, setContent] = useState('');
  const [postImage, setPostImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const ref = useRef();

  function handleContentChange() {}

  function handleImageChange(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;
    setPostImage(e.target.files[0]);
    if (e.target.files.length !== 0) {
      setImagePreview(URL.createObjectURL(e.target.files[0]));
    }
  }

  function removeImage() {
    setPostImage(null);
    setImagePreview(null);
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  return (
    <dialog id='post-modal' className='modal'>
      <div className='modal-box'>
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
            ></textarea>
            <div className='flex gap-2'>
              <input
                type='file'
                className='img-input file-input file-input-bordered file-input-primary file-input-sm w-full'
                accept='image/*'
                onChange={handleImageChange}
                onClick={(e) => (e.target.value = null)}
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
            <button type='submit' className='btn btn-primary self-end'>
              Submit Post
            </button>
          </form>
          <div className='w-full'>
            {imagePreview && (
              <img
                className='w-full'
                src={imagePreview && imagePreview}
                alt='user image upload'
              />
            )}
          </div>
        </div>
      </div>
    </dialog>
  );
}

import { FormEvent, useRef } from 'react';
import { Post } from '../types/types';
import useDeletePost from '../hooks/useDeletePost';
import { useNavigate } from 'react-router-dom';

type Props = {
  post: Post;
};
export default function DeletePostModal({ post }: Props) {
  const { isLoading, deletePost } = useDeletePost();
  const modalRef = useRef<HTMLDialogElement>(null);
  const nav = useNavigate();
  const postID = post._id;

  async function handleDeletePost(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await deletePost(postID);
    if (modalRef.current) modalRef.current.close();
    nav(`/${post.author.username}`);
  }

  return (
    <dialog id='delete-post-modal' className='modal' ref={modalRef}>
      <div className='modal-box max-h-[80%]'>
        <form method='dialog'>
          <button className='btn btn-circle btn-ghost btn-sm absolute right-2 top-2'>
            ✕
          </button>
        </form>

        <div className='flex flex-col gap-2'>
          <h3 className='text-xl font-bold'>Delete Post?</h3>
          <form className='flex flex-col gap-4' onSubmit={handleDeletePost}>
            <p>Are you sure? This cannot be undone.</p>
            {isLoading ? (
              <span className='loading loading-spinner self-end text-primary'></span>
            ) : (
              <button type='submit' className='btn btn-primary self-end'>
                Confirm
              </button>
            )}
          </form>
        </div>
      </div>
    </dialog>
  );
}

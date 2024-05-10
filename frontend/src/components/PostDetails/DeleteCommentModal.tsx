import { FormEvent, useRef } from 'react';
import { Comment, Post } from '../../types/types';
import useDeleteComment from '../../hooks/useDeleteComment';

type Props = {
  comment: Comment;
  post: Post;
};
export default function DeleteCommentModal({ comment, post }: Props) {
  const { isLoading, deleteComment } = useDeleteComment();
  const modalRef = useRef<HTMLDialogElement>(null);
  const commentID = comment._id;
  const postID = post._id;

  async function handleDeleteComment(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await deleteComment(commentID, postID);
    if (modalRef.current) modalRef.current.close();
    window.location.reload();
  }

  return (
    <dialog id='delete-comment-modal' className='modal' ref={modalRef}>
      <div className='modal-box max-h-[80%]'>
        <form method='dialog'>
          <button className='btn btn-circle btn-ghost btn-sm absolute right-2 top-2'>
            ✕
          </button>
        </form>

        <div className='flex flex-col gap-2'>
          <h3 className='text-xl font-bold'>Delete Comment?</h3>
          <form className='flex flex-col gap-4' onSubmit={handleDeleteComment}>
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

import { Trash2 } from 'lucide-react';
import { Comment, Post } from '../../types/types';
import DeleteCommentModal from './DeleteCommentModal';

type Props = {
  comment: Comment;
  post: Post;
};

export default function DeleteCommentButton({ comment, post }: Props) {
  return (
    <>
      <button
        onClick={() =>
          (
            document.getElementById(
              'delete-comment-modal',
            ) as HTMLDialogElement | null
          )?.showModal()
        }
        className='btn btn-ghost btn-sm z-50'
      >
        <Trash2 size={18} color='red' />
      </button>
      <DeleteCommentModal comment={comment} post={post} />
    </>
  );
}

import { Trash2 } from 'lucide-react';
import { Post } from '../types/types';
import DeletePostModal from './DeletePostModal';

type Props = {
  post: Post;
};

export default function DeletePostButton({ post }: Props) {
  return (
    <>
      <button
        onClick={() =>
          (
            document.getElementById(
              'delete-post-modal',
            ) as HTMLDialogElement | null
          )?.showModal()
        }
        className='btn btn-ghost btn-sm z-50'
      >
        <Trash2 size={18} color='red' />
      </button>
      <DeletePostModal post={post} />
    </>
  );
}

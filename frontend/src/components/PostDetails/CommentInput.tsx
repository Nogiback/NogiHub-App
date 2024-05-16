import { ChangeEvent, FormEvent, useState } from 'react';
import { useAuthContext } from '../../context/AuthContext';
import { useParams } from 'react-router-dom';
import useComment from '../../hooks/useComment';

export default function CommentInput() {
  const { authUser } = useAuthContext();
  const { postID } = useParams();
  const [content, setContent] = useState('');
  const { isLoading, submitComment } = useComment();

  function handleCommentChange(e: ChangeEvent<HTMLTextAreaElement>) {
    setContent(e.target.value);
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (postID) {
      await submitComment(content, postID);
    }
    setContent('');
    window.location.reload();
  }

  return (
    <div className='container flex items-center gap-4 border-b border-base-300 pb-4'>
      <div className='avatar mt-2 self-start'>
        <div className='w-12 rounded-full ring ring-primary ring-offset-2 ring-offset-base-100'>
          <img
            loading='lazy'
            src={authUser?.profilePic}
            alt='user profile picture'
          />
        </div>
      </div>
      <div className='container'>
        <form
          className='flex w-full items-center justify-center gap-4'
          onSubmit={handleSubmit}
        >
          <textarea
            autoFocus
            className='textarea textarea-bordered w-full resize-none'
            rows={2}
            placeholder={`Post your comment`}
            onChange={handleCommentChange}
            value={content}
          ></textarea>
          {isLoading ? (
            <button type='submit' className='btn disabled btn-primary w-16'>
              <span className='loading loading-spinner'></span>
            </button>
          ) : (
            <button type='submit' className='btn btn-primary w-16'>
              Send
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

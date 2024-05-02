import BackButton from '../components/BackButton';
import CommentInput from '../components/PostDetails/CommentInput';
import PostCommentsSection from '../components/PostDetails/PostCommentsSection';
import PostDetailsCard from '../components/PostDetails/PostDetailsCard';
import SidebarNav from '../components/SidebarNav';
import useGetPost from '../hooks/useGetPost';

export default function PostDetails() {
  const { isLoading, post } = useGetPost();

  return (
    <div className='flex w-full flex-col gap-2 p-4 sm:gap-6 sm:p-8 md:flex-row'>
      <SidebarNav />
      <div className='container flex w-full flex-col gap-4 bg-base-100 md:w-[600px]'>
        <div className='flex items-center justify-start gap-4'>
          <BackButton />
          <h1 className='text-2xl font-extrabold'>Post</h1>
        </div>
        <div className=''>
          {post && <PostDetailsCard isLoading={isLoading} post={post} />}
          {post && <CommentInput />}
          {post && <PostCommentsSection />}
        </div>
      </div>
    </div>
  );
}

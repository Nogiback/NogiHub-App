export default function ProfilePostsToggleButton() {
  return (
    <div className='container flex w-full items-center justify-around bg-base-100 p-4 md:w-[600px]'>
      <button className='btn btn-link btn-lg text-secondary no-underline'>
        Posts
      </button>
      <button className='btn btn-link btn-lg text-secondary no-underline'>
        Likes
      </button>
    </div>
  );
}

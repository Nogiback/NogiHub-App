export default function PostSkeleton() {
  return (
    <div className='container flex animate-pulse gap-4 pb-3'>
      <div className='mt-2 self-start'>
        <div className='h-12 w-12 rounded-full bg-base-300 '></div>
      </div>
      <div className='container flex flex-col gap-2'>
        <div className='h-6 w-full rounded-lg bg-base-300 '></div>

        <div className='h-6 w-full rounded-lg bg-base-300 '></div>

        <div className='h-80 w-full rounded-lg bg-base-300 '></div>
      </div>
    </div>
  );
}

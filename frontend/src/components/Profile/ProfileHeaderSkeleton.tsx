export default function ProfileHeaderSkeleton() {
  return (
    <div className='h-[19rem] w-full rounded-lg border-2 border-base-300 md:w-[600px]'>
      <div className='flex h-full animate-pulse flex-col items-start justify-start gap-8 p-4'>
        <div className='h-24 w-24 rounded-full bg-base-300'></div>
        <div className='flex w-full flex-col space-y-3'>
          <div className='h-6 w-full rounded-md bg-base-300 '></div>
          <div className='h-6 w-80 rounded-md bg-base-300 '></div>
          <div className='h-6 w-64 rounded-md bg-base-300 '></div>
        </div>
      </div>
    </div>
  );
}

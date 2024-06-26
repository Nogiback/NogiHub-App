export default function UserCardSkeleton() {
  return (
    <div className='h-32 w-full rounded-lg border-2 border-base-300 md:w-[550px]'>
      <div className='flex h-full animate-pulse flex-row items-center justify-start space-x-5 p-4'>
        <div className='h-12 w-12 rounded-full bg-base-300 '></div>
        <div className='flex flex-col space-y-3'>
          <div className='h-6 w-80 rounded-lg bg-base-300 '></div>
          <div className='h-6 w-60 rounded-lg bg-base-300 '></div>
        </div>
      </div>
    </div>
  );
}

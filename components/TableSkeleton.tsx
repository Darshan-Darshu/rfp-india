import { Skeleton } from "@/components/ui/skeleton";

function TableSkeleton() {
  return (
    <div className='flex flex-col space-y-3 max-w-[96vw] md:max-w-[60vw] mx-auto'>
      <Skeleton className='h-[80px] rounded-xl' />
      <div className='space-y-2'>
        {Array(15)
          .fill("")
          .map((_, index) => (
            <Skeleton
              key={index}
              className='h-6'
            />
          ))}
      </div>
      <div className='flex justify-end items-center mt-4 space-x-4'>
        <Skeleton className='h-8 w-[100px]' />
        <Skeleton className='h-8 w-[100px]' />
      </div>
    </div>
  );
}

export default TableSkeleton;

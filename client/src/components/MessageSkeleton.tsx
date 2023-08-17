import { Skeleton } from '@/components/ui/skeleton'

export function MessageSkeleton() {
    return (
        <div className='flex items-center space-x-4'>
            <Skeleton className='h-12 w-12 rounded-lg bg-medium-gray' />
            <div className='space-y-2'>
                <Skeleton className='h-4 w-[250px] bg-medium-gray' />
                <Skeleton className='h-4 w-[200px] bg-medium-gray' />
            </div>
        </div>
    )
}

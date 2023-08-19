import { Skeleton } from './ui/skeleton'
export default function MembersSkeleton() {
    return (
        <div className='flex items-center gap-4'>
            <Skeleton className='w-10 h-10 rounded-lg bg-medium-gray' />
            <Skeleton className='h-3 w-36 bg-medium-gray' />
        </div>
    )
}

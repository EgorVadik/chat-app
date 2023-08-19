import { checkIfSameDay, formatDateSeparator } from '@/lib/utils'

type Props = {
    date1: Date
    date2: Date
}

export default function MessageSeparator({ date1, date2 }: Props) {
    return !checkIfSameDay(date1, date2) ? (
        <div className='flex gap-6 items-center py-4'>
            <div className='w-full h-[1px] bg-medium-gray'></div>
            <p className='text-xs font-semibold text-medium-gray whitespace-nowrap'>
                {formatDateSeparator(date1)}
            </p>
            <div className='w-full h-[1px] bg-medium-gray'></div>
        </div>
    ) : null
}

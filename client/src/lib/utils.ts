import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import moment from 'moment'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function formatDate(date: Date) {
    const formattedDate = moment(date).calendar()
    return formattedDate.includes('Today')
        ? moment(date).fromNow()
        : formattedDate
}

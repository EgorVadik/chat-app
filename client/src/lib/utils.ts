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

export function checkIfSameDay(date1: Date, date2: Date) {
    return moment(date1).isSame(date2, 'day')
}

export function formatDateSeparator(date: Date) {
    return moment(date).format('MMMM D YYYY')
}

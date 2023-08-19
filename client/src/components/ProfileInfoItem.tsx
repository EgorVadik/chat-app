type Props = {
    title: string
    data: string
    borderBottom?: boolean
    image?: string
}

export default function ProfileInfoItem({
    title,
    data,
    borderBottom,
    image,
}: Props) {
    return (
        <div
            className={`grid grid-cols-3 w-full py-6 ${
                borderBottom != null && 'border-b border-b-lightest-gray'
            } px-10 items-center`}
        >
            <div className='text-sm font-medium text-lighter-gray uppercase'>
                {title}
            </div>

            {image !== undefined ? (
                <>
                    <img
                        src={image}
                        alt={data}
                        className='w-[72px] h-[72px] rounded-lg'
                    />
                </>
            ) : (
                <div className='text-lg font-medium text-medium-gray col-span-2'>
                    {data}
                </div>
            )}
        </div>
    )
}

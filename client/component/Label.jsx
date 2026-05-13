export default function Label({
    className,
    children
}){
    return(
        <div className={`${className} `}>
        <div className={` whitespace-nowrap text-sm  `}>{children}</div>
        </div>
    )
}
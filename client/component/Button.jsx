export default function Button({
    className,
    children
}
){
    return(
         <button className={` ${className} flex justify-center items-center rounded-full`}>
            {children}
         </button>
    )
}
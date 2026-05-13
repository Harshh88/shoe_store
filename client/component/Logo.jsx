export default function Logo({
    className,
    marginh1,
    firstEl,
    secondEl,
    thirdEl,
    firstElColor,
    secondElColor,
    thirdElColor,
    secondElPadd
}){
    return (
        <div className={`${className}`}>
            <h1 className={`${marginh1} ${firstElColor}`}>{firstEl}</h1>
            <span className={`${secondElColor} ${secondElPadd} py-[1rem] italic`}>{secondEl}</span>
            <span className={`${thirdElColor}`}>{thirdEl}</span>
        </div>
    )
}
export default function Logo({
    className,
    firstEl,
    secondEl,
    thirdEl,
    firstElColor,
    secondElColor,
    thirdElColor
}) {
    return (
        <div className={`${className}`}>
            {/* NEON Row */}
            <h1 className={`${firstElColor} leading-none mb-1`}>{firstEl}</h1>
            
            {/* KINETIC V1 Row */}
            <div className="flex items-baseline leading-none">
                <span className={`${secondElColor}`}>{secondEl}</span>
                <span className={`${thirdElColor}`}>{thirdEl}</span>
            </div>
        </div>
    )
}
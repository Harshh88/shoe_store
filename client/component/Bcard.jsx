export default function Bcard({
    height,
    width,
    imgHeight,
    imgWidth,
    imgSrc,
    content
}){
    return(
        <div className={`${height} ${width} rounded-2xl overflow-hidden`}>
            <img
            className={`${imgHeight} ${imgWidth} overflow-hidden`}
            src={imgSrc} alt="" />
            {content && <div className="text-white">{content}</div>}
        </div>
    )
}
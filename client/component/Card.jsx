export default function Card({
    image,
    variant = "top",
    size = "medium",
    rounded = "md",
    shadow = "md",
    height = "h-48",
    scale = "grayscale", 
    children
}){
    const sizeStyles = {
        small: "w-40",
        medium: "w-64",
        large: "w-80",
        fit: "w-full"
    };

    const roundedStyles = {
        none: "rounded-none",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        full: "rounded-full"
    }

    const shadowStyles = {
        sm: "shadow-sm",
        md: "shadow-md",
        lg: "shadow-lg"
    }

    const imageStyles = {
        top: "w-full h-40 object-cover mb-3",
        side: "w-1/3 h-full object-cover",
        small: "w-16 h-16 object-cover rounded-full",
        overlay: "w-full h-full object-cover object-center absolute top-0 left-0 "
    }

    const imageScales = {
        grayscale : "grayscale brightness-75 contrast-125",
        emptyscale : ""
    }

    if(variant === "side"){
        return (
            <div className={`bg-white flex overflow-hidden ${height} ${roundedStyles[rounded]} ${shadowStyles[shadow]} ${sizeStyles[size]}`}>
                {image && <img src={image} className={imageStyles.side}/>}
                <div className="p-4">{children}</div>
            </div>
        )
    }

    if(variant === "small"){
        return(
            <div className={`flex items-center gap-3 ${height}`}>
                {image && <img src={image} className={imageStyles.small}/>}
                <div>{children}</div>
            </div>
        )
    }

    if(variant === "overlay"){
        return(
            <div className={`relative overflow-hidden text-white ${height} ${roundedStyles[rounded]} ${shadowStyles[shadow]} ${sizeStyles[size]}`}>
                {image && <img src={image} className= {`${imageScales[scale]} ${imageStyles.overlay}`}/>}
                <div className="relative z-10 p-4 bg-black/50 h-full flex flex-col justify-end">{children}</div>
            </div>
        )
    }

    return (
    <div className={`bg-white p-4 ${height} ${roundedStyles[rounded]} ${shadowStyles[shadow]} ${sizeStyles[size]}`}>
      {image && <img src={image} className={`${imageStyles.top} ${roundedStyles[rounded]}`} />}
      {children}
    </div>
    )
}
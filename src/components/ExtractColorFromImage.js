import { useState, useRef, useEffect } from "react";

const ExtractColorFromImage = ({imageUrl, setColor}) => {
    
    const currentRef = useRef();
    const points =[
        {x: 0,y: 0},
        {x: 320,y: 320},
        {x: 420,y: 100},
        {x: 420,y: 100},
        {x: 540,y: 580},
    ];

    useEffect ( () => {
        const canvas = currentRef.current;
        const context = canvas.getContext('2d');
        var red = 0, green = 0, blue = 0;

        canvas.willReadFrequently = true;

        const image = new Image();
        image.src = imageUrl;
        image.crossOrigin = "Anonymous";

        image.onload = () => {
            canvas.width = image.width;
            canvas.height = image.height;
            context.drawImage(image, 0, 0, image.width, image.height);

            for (let i = 0;i < 5;i++) {

                const pixel = context.getImageData( points[i].x, points[i].y, 1, 1).data;
                red += pixel[0];
                green += pixel[1];
                blue += pixel[2];

            }
            red = Math.floor(red / 6);
            green = Math.floor(green / 6);
            blue = Math.floor(blue / 6);

            const color = `rgb(${red}, ${green}, ${blue})`;
            setColor(color);

        }
    }, [imageUrl]);
    

    return (
        <canvas ref={currentRef} className=" hidden"></canvas>
    );
}   

export default ExtractColorFromImage;
import { useEffect, useState } from "react";
import { CloseIcon } from "../components/Icons/Icons";

export const PopUpMessage = ({display, message}) => {

    useEffect ( () => {

        setShow(display);

    }, [display]);

    const [show, setShow] = useState(display);

    return(
        <div className=" absolute flex z-50 justify-center w-full h-16 ">
            <div className=" absolute w-60 h-10 flex justify-center items-center bg-cyan-500 rounded-xl p-4 transition-transform duration-500"
                style={{
                    transform: show ? "": "translateY(-600px)" ,
                }}>
                <span className=" text-black font-bold mr-4">{message}</span>
                <span className=" bg-black rounded-sm" onClick={() => {
                    setShow(false);
                }}><CloseIcon/></span>
            </div>
        </div>
        
    );
};
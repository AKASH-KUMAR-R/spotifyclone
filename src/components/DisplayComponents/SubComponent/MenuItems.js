import { PlusIcon } from "../../Icons/Icons";
import { RemoveIcon } from "../../Icons/RemoveIcon";

export const MenuItems = ({isUser, removeTrack, setDisplayOption}) => {
    return (
            <div className=" flex flex-col items-center justify-center">
                <span onClick={() => {
                    setDisplayOption(true);
                }}
                className=" flex gap-2 w-full h-10 items-center"><PlusIcon /><span className=" font-semibold text-lg">Add to playlist</span></span>
                <span
                style={{
                     display: isUser ? "flex" : "none"
                }}
                onClick={() => {
                     removeTrack();
                }}
                className=" flex gap-2 w-full h-10 items-center "><RemoveIcon /><span className=" font-semibold text-lg">Delete from playlist</span></span>
            </div>
    );
}
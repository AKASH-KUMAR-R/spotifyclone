import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { MenuItems } from "../components/DisplayComponents/SubComponent/MenuItems";
import { MoreIcon } from "../components/Icons/MoreIcon";


export const BottomUpMenu = ({userId, ownerId, displayMenu , setDisplayOption, setShowMenu, removeTrack}) => {


    return (
        <div className=" z-50 w-full h-full spotify-component-bg-color p-2  rounded-t-3xl duration-300  transition-transform"
        style={{
            transform: displayMenu ? "translateY(-100%)" : "translateY(0)",
        }}>
            <div className=" w-full flex items-center justify-center"
            onClick={() => {
                setShowMenu(false);
            }}>
                <MoreIcon />
            </div>
            <div className=" p-2" onClick={() => {
                setShowMenu(false);
            }}>
                <MenuItems 
                    removeTrack={removeTrack} 
                    isUser={userId === ownerId} 
                    setDisplayOption={setDisplayOption} 
                />
            </div>
        </div>
    );
}
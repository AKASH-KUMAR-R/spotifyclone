import { ExpandIcon, HomeIcon, LibraryIcon, SearchIcon } from "./Icons/Icons";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

export const BottomNav = () => {

    return (
        <div className=" fixed w-full h-14 top-section z-50 bottom-0 left-0 flex items-center justify-around sm:hidden text-xs">
            <Link className=" flex flex-col items-center gap-1 " to="/"> <HomeIcon className=" ml-2" /><span>Home</span></Link>
            <Link className="flex flex-col items-center gap-1" to="/search"><SearchIcon /><span>Search</span></Link>
            <Link className="flex flex-col items-center gap-1" to="/library"><LibraryIcon /><span>Your Library</span></Link>
            <Link className=" flex flex-col items-center gap-1" to="/premium"><ExpandIcon className="ml-2" /><span>Premium</span></Link>
        </div> 
    );
}
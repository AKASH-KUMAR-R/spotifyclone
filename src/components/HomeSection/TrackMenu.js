import { PlusIcon } from "../Icons/Icons";
import { RemoveIcon } from "../Icons/RemoveIcon";


export const TrackMenu = ({userData, position}) => {
    return(
        <div className="absolute flex flex-col gap-2 bg-slate-600"
        style={{
            left: position.right,
            top: position.top
        }}>
            <div className=" flex">
                <PlusIcon />
                <span>Add to playlist</span>
                
            </div>
            <div className=" flex ">
                <RemoveIcon />
                <span>Remove from playlist</span>
                
            </div>
        </div>
    );
}
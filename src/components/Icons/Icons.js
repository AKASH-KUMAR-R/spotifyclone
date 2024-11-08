import playButtonIcom from "./play-icon.png";
//collection of icons


export const PlayButtonIcon = ({className}) => {
    return (
        // <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#27C75F" className="w-16 h-16 ">
        //     <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm14.024-.983a1.125 1.125 0 0 1 0 1.966l-5.603 3.113A1.125 1.125 0 0 1 9 15.113V8.887c0-.857.921-1.4 1.671-.983l5.603 3.113Z" clipRule="evenodd" />
        // </svg>
        <img src={playButtonIcom} className=" min-w-12" alt="play icon"></img>
    );
}

export const LibraryIcon = ({className}) => {

    return (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokelinecap="round" strokeLinejoin="round" className={"lucide lucide-list " + className}>
            <line x1="8" x2="21" y1="6" y2="6"/>
            <line x1="8" x2="21" y1="12" y2="12"/>
            <line x1="8" x2="21" y1="18" y2="18"/>
            <line x1="3" x2="3.01" y1="6" y2="6"/>
            <line x1="3" x2="3.01" y1="12" y2="12"/>
            <line x1="3" x2="3.01" y1="18" y2="18"/>
        </svg>
    );
}

export const HomeIcon = ({className}) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className={"w-6 h-6" + className}>
            <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
            <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
        </svg>
    );
}

export const SearchIcon = ({className}) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path fill-rule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clip-rule="evenodd" />
        </svg>
    );
}

export const ExpandIcon = ({className}) => {

    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={"w-6 h-6 " + className}>
            <path d="M11.584 2.376a.75.75 0 0 1 .832 0l9 6a.75.75 0 1 1-.832 1.248L12 3.901 3.416 9.624a.75.75 0 0 1-.832-1.248l9-6Z" />
            <path fill-rule="evenodd" d="M20.25 10.332v9.918H21a.75.75 0 0 1 0 1.5H3a.75.75 0 0 1 0-1.5h.75v-9.918a.75.75 0 0 1 .634-.74A49.109 49.109 0 0 1 12 9c2.59 0 5.134.202 7.616.592a.75.75 0 0 1 .634.74Zm-7.5 2.418a.75.75 0 0 0-1.5 0v6.75a.75.75 0 0 0 1.5 0v-6.75Zm3-.75a.75.75 0 0 1 .75.75v6.75a.75.75 0 0 1-1.5 0v-6.75a.75.75 0 0 1 .75-.75ZM9 12.75a.75.75 0 0 0-1.5 0v6.75a.75.75 0 0 0 1.5 0v-6.75Z" clip-rule="evenodd" />
            <path d="M12 7.875a1.125 1.125 0 1 0 0-2.25 1.125 1.125 0 0 0 0 2.25Z" />
        </svg>
    );
}


export const PlusIcon = ({className}) => {

    return(
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" strokeWidth="1" className="w-6 h-6">
            <path fill-rule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
        </svg>
    );
}

export const CloseIcon = ({className}) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x">
            <path d="M18 6 6 18"/>
            <path d="m6 6 12 12"/>
        </svg>
    );
}

export const ZapIcon = ({className}) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-zap">
            <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/>
        </svg>
    );
}

export const HistoryIcon = ({className}) => {

    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-history">
            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
            <path d="M3 3v5h5"/>
            <path d="M12 7v5l4 2"/>
        </svg>
    );
}

export const UserIcon = ({ className}) => {
    return(
        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={"lucide lucide-circle-user-round " + className}>
            <path d="M18 20a6 6 0 0 0-12 0"/>
            <circle cx="12" cy="10" r="4"/>
            <circle cx="12" cy="12" r="10"/>
        </svg>
    );
}

export const MusicIcon = ({className, width, height}) => {

    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={width ? width : "60"} height={height ? height : "60"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-music">
            <path d="M9 18V5l12-2v13"/>
            <circle cx="6" cy="18" r="3"/>
            <circle cx="18" cy="16" r="3"/>
        </svg>
    );
}

export const LoadingIcon = ({className}) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className={className} preserveAspectRatio="xMidYMid" width="60" height="60" style={{ shapeRendering: 'auto', display: 'block' }}>
      <g>
        <rect x="17.5" y="30.5" width="15" height="39" fill="#1db954">
          <animate attributeName="y" repeatCount="indefinite" dur="1.5873015873015872s" calcMode="spline" keyTimes="0;0.5;1" values="16.849999999999994;30.5;30.5" keySplines="0 0.5 0.5 1" begin="-0.3174603174603175s"></animate>
          <animate attributeName="height" repeatCount="indefinite" dur="1.5873015873015872s" calcMode="spline" keyTimes="0;0.5;1" values="66.30000000000001;39;39" keySplines="0 0.5 0.5 1;0 0.5 0.5 1" begin="-0.3174603174603175s"></animate>
        </rect>
        <rect x="42.5" y="30.5" width="15" height="39" fill="#1db954">
          <animate attributeName="y" repeatCount="indefinite" dur="1.5873015873015872s" calcMode="spline" keyTimes="0;0.5;1" values="20.262499999999996;30.5;30.5" keySplines="0 0.5 0.5 1;0 0.5 0.5 1" begin="-0.15873015873015875s"></animate>
          <animate attributeName="height" repeatCount="indefinite" dur="1.5873015873015872s" calcMode="spline" keyTimes="0;0.5;1" values="59.47500000000001;39;39" keySplines="0 0.5 0.5 1;0 0.5 0.5 1" begin="-0.15873015873015875s"></animate>
        </rect>
        <rect x="67.5" y="30.5" width="15" height="39" fill="#1db954">
          <animate attributeName="y" repeatCount="indefinite" dur="1.5873015873015872s" calcMode="spline" keyTimes="0;0.5;1" values="20.262499999999996;30.5;30.5" keySplines="0 0.5 0.5 1;0 0.5 0.5 1"></animate>
          <animate attributeName="height" repeatCount="indefinite" dur="1.5873015873015872s" calcMode="spline" keyTimes="0;0.5;1" values="59.47500000000001;39;39" keySplines="0 0.5 0.5 1;0 0.5 0.5 1"></animate>
        </rect>
      </g>
    </svg>
    );
}
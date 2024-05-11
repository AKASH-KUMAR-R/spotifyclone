import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { LibraryIcon } from "../Icons/Icons";
import {LeftArrow} from '../Icons/LeftArrow';
import {RightArrow} from '../Icons/RightArrow';
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect, useState } from "react";
import { useContext } from "react";
import LoginContext from "../ContestLogin/LoginDetails";

const TopNav = ({setShowLibrary}) => {

    const history = useHistory();
    // const [isLogIn, setIsLogIn] = useState(window.localStorage.getItem('user_token') ? true : false);
    const {isLogIn, setIsLogIn} = useContext(LoginContext);

    useEffect( () => {
      setIsLogIn(window.localStorage.getItem('user_token') ? true : false);
    }, [])

    const moveForward = () => {
        history.goForward();
    }

    const moveBackward = () => {
        history.goBack();
    }

    const LogOut = () => {
      window.localStorage.removeItem('user_token');
      setIsLogIn(false);
    }


    return (
      <div className="top-section w-full absolute p-3 flex justify-between items-center z-10 ">
          <div className=" flex gap-5 items-center">
            <div className=" flex gap-1 ">
              <div onClick={() => {setShowLibrary(prev => !prev)}}><LibraryIcon className=" block sm:hidden"/></div>

              <span onClick={ () => {moveBackward()}}><LeftArrow /></span>
              <span onClick={() => {moveForward()}}><RightArrow /></span>
              
            </div>
          </div>
          <div className="flex gap-4 justify-center items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokelinecap="round" strokeLinejoin="round" className="lucide lucide-bell">
                <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/>
                <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokelinecap="round" strokeLinejoin="round" className="lucide lucide-users">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokelinecap="round" strokeLinejoin="round" className="lucide lucide-circle-user-round">
                <path d="M18 20a6 6 0 0 0-12 0"/>
                <circle cx="12" cy="10" r="4"/>
                <circle cx="12" cy="12" r="10"/>
              </svg>
              <button className=" w-20 h-8 outline outline-white rounded-md hover:outline-slate-500 transition-all duration-200"
                onClick={() => {LogOut()}}>
                  {isLogIn ? <>Log out</> : <Link to="/login">Sign in</Link>}
                </button>
          </div>
    </div>
          
    );
        
}

export default TopNav;
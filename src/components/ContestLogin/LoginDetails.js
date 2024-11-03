import { createContext, useState } from "react";


const LoginContext = createContext();

export const LoginDetail = ({children}) => {

    const [isLogIn , setIsLogIn] = useState(window.localStorage.getItem('user_token') ? true : false);


    return (
        <LoginContext.Provider value={{isLogIn, setIsLogIn}} >
            {children}
        </LoginContext.Provider>
    );
};

export default LoginContext;
import React, { createContext, useContext, useState } from "react";

const authContext = createContext();

export const ProvideAuth = (props) => {
    const [token, setToken] = useState(window.localstorage.getItem("auth_token"));
    const [currentUser, setcurrentUser] = useState({});


    const signin = (data) => {
        window.localStorage.setItem("auth_token", data.token);
        setToken(data.token);
        setcurrentUser({
            firstName :data.item.firstName, 
            avatar :data.item.pictureUrl,
            email :data.item.email
        })
        }; 
        

    const signout = async () => {
        window.localStorage.removeItem("auth-token");
        setToken(null);
        
    };

    const providerValues = {
        signin,
        signout,
        token,
        currentUser,
    };

    return <authContext.Provider value={providerValues} {...props} />;
    
};

export const useAuth = () => useContext(authContext);
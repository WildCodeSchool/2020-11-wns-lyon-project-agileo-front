import React, { createContext, useContext, useState } from "react";

const authContext = createContext();

export const ProvideAuth = (props) => {
    const [token, setToken] = useState('');


    const signin = (data) => {
        window.localStorage.setItem("auth-token", data);
        setToken("auth-token", data);
    };

    const signout = async () => {
        window.localStorage.removeItem("auth-token");
        setToken(null);
        
    };

    const providerValues = {
        signin,
        signout,
        token
    };

    return <authContext.Provider value={providerValues} {...props} />;
};

export const useAuth = () => useContext(authContext);
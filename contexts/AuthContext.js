import React, { createContext, useContext, useState } from "react";

const authContext = createContext();

export const ProvideAuth = (props) => {
    const [token, setToken] = useState(window.localStorage.getItem("auth-token"));

    const signin = (data, callback) => {
        window.localStorage.setItem("auth-token", data.token);
        setToken("");
        callback();

    };

    const signout = (callback) => {

        window.localStorage.removeItem("auth-token");
        setToken(null);
        callback();

    };

    const providerValues = {
        signin,
        signout,
        token
    };

    return <authContext.Provider value={providerValues} {...props} />;
};

export const useAuth = () => useContext(authContext);
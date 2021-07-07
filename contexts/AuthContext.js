import React, { createContext, useContext, useState, useEffect } from "react";
import { gql, useApolloClient } from '@apollo/client'
const authContext = createContext();

const GET_USER_CONNECTED = gql`
        query {
            authenticatedUser {
            id
            firstName
            lastName
            pictureUrl
            }

        }
`;




export const ProvideAuth = (props) => {
    const [token, setToken] = useState(window.localStorage.getItem("auth_token", token));
    const [currentUser, setcurrentUser] = useState();
    const apolloClient = useApolloClient()



    useEffect(() => {
        (async () => {
            if (token) {
                const result = await apolloClient.query({ query: GET_USER_CONNECTED,fetchPolicy:"network-only" })
                if (result?.data?.authenticatedUser ) {
                    setcurrentUser({
                        firstName: result.data.authenticatedUser.firstName,
                        avatar: result.data.authenticatedUser.pictureUrl,
                        email: result.data.authenticatedUser.email
                    })
                }
            }
        })()
    }, [token])


    const signin = (data) => {
        window.localStorage.setItem("auth_token", data.token);
        setToken(data.token);

    };


    const signout = async () => {
        window.localStorage.removeItem("auth_token");
        setToken(null);

    };

    const providerValues = {
        signin,
        signout,
        token,
        currentUser
    };

    return <authContext.Provider value={providerValues} {...props} />;

};

export const useAuth = () => useContext(authContext);
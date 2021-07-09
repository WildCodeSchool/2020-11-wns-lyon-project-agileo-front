import React, { createContext, useContext, useState, useEffect } from "react";
import { gql, useApolloClient } from '@apollo/client'
import SocketIOClient from 'socket.io-client';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
    const [token, setToken] = useState();
    const [currentUser, setcurrentUser] = useState();
    const apolloClient = useApolloClient()
    const socket = SocketIOClient('http://localhost:4000');




    useEffect(() => {
        (async () => {
            const value = await AsyncStorage.getItem("auth_token")
            if (value) {
                setToken(value)
                const result = await apolloClient.query({ query: GET_USER_CONNECTED, fetchPolicy: "network-only" })
                if (result?.data?.authenticatedUser) {
                    setcurrentUser({
                        firstName: result.data.authenticatedUser.firstName,
                        avatar: result.data.authenticatedUser.pictureUrl,
                        email: result.data.authenticatedUser.email
                    })
                }
            } else{
                setcurrentUser(null)
            }
        })()
    }, [token])


    useEffect(() => {

        if ((currentUser === undefined) || (currentUser === null)) {
            socket.on("disconnect", user => {
                console.log(user,"userrrrrrrrrr")
            });
        }
    }, [currentUser])

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
        currentUser,
        socket
    };

    return <authContext.Provider value={providerValues} {...props} />;

};

export const useAuth = () => useContext(authContext);
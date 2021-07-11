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
            email
            }
        }
`;

export const ProvideAuth = (props) => {
    const [token, setToken] = useState();
    const [currentUser, setcurrentUser] = useState();
    const [onlineUsers, setonlineUsers] = useState();
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
                        id: result.data.authenticatedUser.id,
                        firstName: result.data.authenticatedUser.firstName,
                        avatar: result.data.authenticatedUser.pictureUrl,
                        email: result.data.authenticatedUser.email
                    })
                    socket.emit('current_user', result.data.authenticatedUser)
                }
            } else {

                setcurrentUser(null)
            }
        })()
    }, [token])


    useEffect(() => {
        socket.on('onlineUsers', (users) => {
            setonlineUsers(users)
        })
    }, [token])


   
    console.log('onlineUsers', onlineUsers)

    /**
     * object data with token email password...
     * @param {*} data 
     */

    const signin = async (data) => {
        await AsyncStorage.setItem("auth_token", data.token);
        setToken(data.token);
    };



    /**
     * just remove token to signout
     */
    const signout = async () => {
        socket.emit("disconnected", Object.keys(onlineUsers))
        await AsyncStorage.removeItem("auth_token");
        setToken(null);
        console.log('je me dééconnecte wss')
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
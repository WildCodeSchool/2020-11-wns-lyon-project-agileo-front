import React, { useState,useEffect } from "react";
import UserCard from "./UserCard";
import io from 'socket.io-client';
import styles from "./user.module.css"
import { useQuery, gql } from '@apollo/client';
import ChatSocketServer from '../shared/helpers/ChatSocketServer';

const allUsers = gql`
query GetUsers{
    allUsers {
        name
        email
        avatar
    },
    authenticatedUser {
        name
        }
}
`;

const User = (props) => {
    const { loading, error, data } = useQuery(allUsers);
    const deleteUserFunction = () => {
        console.log('user deleted')
    };

    const [selectedUserId, setselectedUserId] = useState(null)
    const [chatListUsers, setchatListUsers] = useState([])

    useEffect(() => {
        const userId = props.userId;
        if(allUsers.authenticatedUser && allUsers.authenticatedUser.name)
        
        ChatSocketServer.getChatList(allUsers.authenticatedUser.name);
        ChatSocketServer.eventEmitter.on('chat-list-response', createChatListUsers);
    }, [allUsers.authenticatedUser])


    const createChatListUsers = (chatListResponse) => {
        if (!chatListResponse.error) {
            if (chatListResponse.singleUser) {
                if (chatListUsers.length > 0) {
                    chatListUsers = chatListUsers.filter(function (obj) {
                        return obj.id !== chatListResponse.chatList[0].id;
                    });
                }
                /* Adding new online user into chat list array */
                chatListUsers = [...chatListUsers, ...chatListResponse.chatList];
            } else if (chatListResponse.userDisconnected) {
                const loggedOutUser = chatListUsers.findIndex((obj) => obj.id === chatListResponse.userid);
                if (loggedOutUser >= 0) {
                    chatListUsers[loggedOutUser].online = 'N';
                }
            } else {
                /* Updating entire chat list if user logs in. */
                chatListUsers = chatListResponse.chatList;
            }
            setchatListUsers({chatListUsers });
        } else {
            alert(`Unable to load Chat list, Redirecting to Login.`);
        }
    }


    const  selectedUser = (user) => {
        setselectedUserId( user.email);
        props.updateSelectedUser(user)
        ChatSocketServer.eventEmitter.removeListener('chat-list-response', createChatListUsers);
    }



    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    return (
        <div className={styles.user_welcome}>
            <div className={styles.user_heading}>
                <p>Hello, {data.authenticatedUser && data.authenticatedUser.name}</p>

            </div>
            <div className={styles.select_user}>
                {data.allUsers && data.allUsers.map((user, index) =>
                    user.email && (
                        <UserCard key={index}
                            name={user.name}
                            avatar={user.avatar}
                            onClick={() => selectedUser(user)}
                            isOnline={user.online}


                            />
                    )
                )}
            </div>
        </div>
    );
};

export default User;

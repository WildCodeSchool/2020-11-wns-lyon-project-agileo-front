import React, { useState,useEffect } from "react";
import UserCard from "./UserCard";
import styles from "./user.module.css"
import { useQuery, gql } from '@apollo/client';


const allUsers = gql`
query GetUsers{
    allUsers {
        firstName
        email
        avatar
    },
    authenticatedUser {
        firstName
        }
}
`;

const User = (props) => {
    const { loading, error, data } = useQuery(allUsers);


    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    return (
        <div className={styles.user_welcome}>
            <div className={styles.user_heading}>
                <p>Hello, {data.authenticatedUser && data.authenticatedUser.firstName}</p>

            </div>
            <div className={styles.select_user}>
                {data.allUsers && data.allUsers.map((user, index) =>
                        <UserCard key={index}
                            firstName={user.firstName}
                            avatar={user.avatar}
                            onClick={() => selectedUser(user)}
                            isOnline={user.online}
                            />
                    
                )}
            </div>
        </div>
    );
};

export default User;

import React, { useState } from 'react';
import Message from '../chat/Message'
import styles from "../chat/user.module.css"
import User from '../chat/User'
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
const index = (props) => {

  const user = {
    email: "abdel@test.fr",
    name: "abdel"
  };
  const { loading, error, data } = useQuery(allUsers);
  const [selectedUser, setselectedUser] = useState(null)
  const [isVisible, setisVisible] = useState(true)
  const [hidden, setHidden] = useState(false);
  const [username, setusername] = useState("")
  const [SelectedUser, setSelectedUser] = useState('')
  const updateSelectedUser = (user) => {
    setselectedUser(user);
  }
  const userId = allUsers.authenticatedUser;


  return (
    <div className={styles.chat_page}>
      <User
        email={user.email}
        name={user.firstName}
        userId={userId}
        updateSelectedUser={updateSelectedUser}
        newSelectedUser={selectedUser}
      />

      <Message
        email={user.email}
        name={user.firstName}
        userId={userId}
        newSelectedUser={selectedUser}

      />
    </div>
  );
}
export default index;

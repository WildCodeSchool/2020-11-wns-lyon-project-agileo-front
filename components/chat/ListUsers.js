import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    FlatList,
} from 'react-native';

import { gql, useQuery } from '@apollo/client'
import { useAuth } from "../../contexts/AuthContext";
import MessagesScreen from './MessagesScreen'


const GET_ALLUSERS = gql`
        query {
            allUsers {
                id
                firstName
                lastName
                role
                pictureUrl
                email
                }
        }
`;

const ListUsers = (props) => {
    const [allUsers, setAllUsers] = useState();
    const [online, setOnline] = useState();
    const [openChat, setOpenChat] = useState({ open: false, user: null });
    const { loading, error, data } = useQuery(GET_ALLUSERS);
    const { currentUser, onlineUsers } = useAuth();


    useEffect(() => {
        if (data?.allUsers && currentUser) {
            setAllUsers(data.allUsers.filter((u) => u.firstName !== currentUser.firstName))
        }
    }, [data, openChat])


    useEffect(() => {
        if(onlineUsers){
            const online = Object.values(onlineUsers).map((e)=>e)
            setOnline(online)
        }
    }, [onlineUsers,currentUser])


    const handleOnPress = (user) => {
        setOpenChat({ open: true, user })
    }
    



    const renderUserInfo = (user,index) => {
        return (
            <View key={index} style={styles.list} onClick={() => handleOnPress(user)}>
                <Image
                    source={{ uri: user.pictureUrl }}
                    style={styles.avatar}
                    resizeMode="center"
                />
                <View style={{ flex: 1, marginLeft: 10 }} >
                    <Text> {user.firstName} </Text>
                    
                </View>
                <View style={{ flex: 1, marginLeft: 10 }} >
                    <Text style={user && (online.some(v => v.includes(user.email)))  ? styles.online : styles.offline}></Text>

                </View>
            </View>
        );
    };

    { loading && <Text>Loading..</Text> }
    return (
        <ScrollView style={styles.itemWapper} key={currentUser.firstName + "id"}>
            {openChat && (openChat && openChat.open) ?
                (
                    <View style={styles.test}  >
                    <MessagesScreen
                    user={openChat.user}
                    open={openChat.open}
                    setOpenChat={setOpenChat}
                />
                    </View>
                ) : (
                    <FlatList
                        data={allUsers}
                        renderItem={({ item,index}) => renderUserInfo(item,index)}
                        keyExtractor={item => item.id.toString()}
                    />)
            }
        </ScrollView>
        
    );
};



const styles = StyleSheet.create({
    itemWapper: {
        borderBottomColor: '#E8E8E8',
        borderBottomWidth: 1,
        paddingTop: 16,
        paddingBottom: 16,
        paddingLeft: 10,
        paddingRight: 10,
    },
    list: {
        flex: 1,
        padding: 8,
        backgroundColor: "#e9e9e9",
        marginVertical: 2,
        marginHorizontal: 10,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row"
    },
    test:{
        height: "83vh",
        position: "absolute",
        width: "100%"
    },
    avatar: {
        width: 50,
        height: 50
    },
    online: {
        backgroundColor: "#aed581",
        borderRadius: "50%",
        width: "8px",
        height: "8px",
        marginRight: "6px"

    },
    offline: {
        backgroundColor: "#f4511e",
        borderRadius: "50%",
        width: "8px",
        height: "8px",
        marginRight: "6px"
    }

});

export default ListUsers
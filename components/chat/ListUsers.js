import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    Alert,
    ScrollView,
    FlatList,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { gql, useQuery } from '@apollo/client'
import { useAuth } from "../../contexts/AuthContext";
import MessagesScreen from './MessagesScreen'
import SocketIOClient from 'socket.io-client';


const GET_ALLUSERS = gql`
        query {
            allUsers {
                id
                firstName
                lastName
                role
                pictureUrl
                }
        }
`;

const ListUsers = (props) => {
    const [allUsers, setAllUsers] = useState();
    const [openChat, setOpenChat] = useState({ open: false, user: null });
    const [onlineUsers, setonlineUsers] = useState();
    const { loading, error, data } = useQuery(GET_ALLUSERS);
    const { currentUser ,socket} = useAuth();

    useEffect(() => {
        if (data?.allUsers && currentUser) {
            setAllUsers(data.allUsers.filter((u) => u.firstName !== currentUser.firstName))
        }
    }, [data,openChat])

    useEffect(() => {
        (async () => {
        socket.on('onlineUsers', users =>{
            setonlineUsers(users)
            console.log(users)
        })
    })()
    }, [props.user,onlineUsers])


    const handleOnPress = (user) => {
        setOpenChat({ open: true, user })
    }
    const renderUserInfo = (user) => {
        return (
            <View style={styles.list} onClick={() => handleOnPress(user)}>
                <Image
                    source={{ uri: user.pictureUrl }}
                    style={styles.avatar}
                    resizeMode="center"
                />
                <View style={{ flex: 1, marginLeft: 10 }} >
                    <Text> {user.firstName} </Text>
                    <Text>{user.email}</Text>
                </View>
            </View>
        );
    };


    return (
        <ScrollView style={styles.itemWapper}>
            {openChat && (openChat && openChat.open) ?
                (<MessagesScreen user={openChat.user}
                    open={openChat.open}
                    setOpenChat={()=>setOpenChat()}
                />
                ) : (
                    <FlatList
                        data={allUsers}
                        renderItem={({ item }) => renderUserInfo(item)}
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
    avatar: {
        width: 50,
        height: 50
    }

});

export default ListUsers
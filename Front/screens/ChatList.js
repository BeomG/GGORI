import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { ref, onValue, off } from 'firebase/database';
import rdb from '../firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import basicImg from "../assets/mypage/basic.png";
export default function ChatRoomList({ navigation }) {
  const [chatRooms, setChatRooms] = useState([]);

  useEffect(() => {
    const fetchMyEmail = async () => {
      const myEmail = await AsyncStorage.getItem('email');
      if (myEmail) {
        setupChatRoomsListener(myEmail);
      }
    };

    fetchMyEmail();

    return () => {
      off(ref(rdb, 'chatRooms'));
    };
  }, []);

  const setupChatRoomsListener = (myEmail) => {
    const chatRoomsRef = ref(rdb, 'chatRooms');
    onValue(chatRoomsRef, (snapshot) => {
      const fetchedChatRooms = [];
      snapshot.forEach((childSnapshot) => {
        const chatRoomId = childSnapshot.key;
        const chatRoomData = childSnapshot.val();

        if (chatRoomData.participants.includes(myEmail)) {
          fetchedChatRooms.push({
            id: chatRoomId,
            lastMessage: chatRoomData.lastMessage,
            title: chatRoomData.jobDetails.title,
            payment: chatRoomData.jobDetails.payment,
            email: chatRoomData.participants.find(p => p !== myEmail), 
            imageUrl : chatRoomData.jobDetails.imageUrl,
            nickName : chatRoomData.jobDetails.nickName,
            // profileImage:chatRoomData.jobDetails.profileImage
            otherUserProfileImage: chatRoomData.otherUserProfileImage
          });
        }
      });

      setChatRooms(fetchedChatRooms);
    });
  };

  function extractJobBoardId(chatRoomId) {
    const parts = chatRoomId.split('_');
    return parts[0];
  }

  const renderItem = ({ item }) => {
 
    const truncatedTitle = item.title.length > 6 ? item.title.substring(0, 6) + '...' : item.title;
    const truncatedLastMessage = item.lastMessage.length > 6 ? item.lastMessage.substring(0, 6) + '...' : item.lastMessage;
  
    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => navigation.navigate('ChatRoom', {
          nickName: item.nickName, 
          email: item.email, 
          jobBoardId: extractJobBoardId(item.id),
          title: item.title,
          payment: item.payment,
          imageUrl: item.imageUrl
        })}
      >
        <Image 
        source={{ uri: item.otherUserProfileImage || basicImg }} // 상대방 프로필 사진 URL
        style={styles.profileImage}
      />
        <View style={styles.messageContainer}>
          <View style={styles.titleRow}>
            <Text style={styles.title}>{truncatedLastMessage}</Text>
            <Text style={styles.messageTime}>{"  방금 전"}</Text> 
          </View>

          <Text style={styles.nickName}>{item.nickName}</Text>
        </View>
        <Image 
          source={{ uri: item.imageUrl }} // 게시물 이미지 URL
          style={styles.postImage} 
        />
      </TouchableOpacity>
    );
  };
  

  return (
    <View style={styles.container}>
      <FlatList
        data={chatRooms}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  unreadIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'red',
    position: 'absolute',
    top: 10,
    left: 10,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  postImage: {
    width: 75,
    height: 75,
    borderRadius: 15,
  },
  itemContainer: {
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e1e1e1', 
    alignItems: 'center',
    backgroundColor: '#fff', 
    borderRadius: 10, 
    marginVertical: 5,
    marginHorizontal: 10,
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30, 
    marginRight: 15,
  },
  messageContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    color: '#333',
    fontWeight: 'bold',
  },
  messageTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  nickName: {
    fontSize: 14,
    fontWeight: '500', 
    color: '#555', 
    marginTop: 2,
  },
  messageTime: {
    fontSize: 12,
    color: '#999',
  },
  lastMessage: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
});
import React, { useState, useEffect, useCallback } from 'react';
import { GiftedChat, Bubble, InputToolbar } from 'react-native-gifted-chat';
import { Image, View, Text, StyleSheet, ImageBackground,TouchableOpacity } from 'react-native';
import rdb from '../../firebaseConfig';
import { ref, push, onValue, off, serverTimestamp, set } from 'firebase/database';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Reser } from "../../api/Reser/Reser";
import basicImg from "../../assets/mypage/basic.png";
// 파이어베이스 채팅방 키생성 보드id + 유저 + 유저
function createChatRoomId(email1, email2, jobBoardId) {
  return [email1, email2, jobBoardId].sort().join('_');
}

export default function ChatRoom({ route, navigation }) {
  const [messages, setMessages] = useState([]);
  const { email, jobBoardId, nickName, imageUrl, title='', payment='' } = route.params;
  const [myEmail, setMyEmail] = useState('');
  const [myNickName, setMyNickName] = useState('');
  const [profileImg, setProfileImg] = useState('');
  // 헤더
  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{nickName}</Text>
        </View>
      ),
    });
  }, [navigation, nickName]);

  useEffect(() => {
    const fetchMyDetails = async () => {
      try {
        const storedMyEmail = await AsyncStorage.getItem('email');
        const storedMyNickName = await AsyncStorage.getItem('nickName');
        const storedProfileImg = await AsyncStorage.getItem('profileImg'); // 프로필 이미지 URL 가져오기
        setMyEmail(storedMyEmail);
        setMyNickName(storedMyNickName);
        setProfileImg(storedProfileImg); // 상태에 저장
      } catch (error) {
        console.error('Error fetching user details', error);
      }
    };
    console.log('프사',profileImg)
    fetchMyDetails();
  }, []);
  

  useEffect(() => {
    if (myEmail && email && jobBoardId) {
       
      console.log("Emails and JobBoardId:", myEmail, email, jobBoardId);
      const chatRoomId = createChatRoomId(myEmail, email, jobBoardId);
      console.log("Generated Chat Room ID:", chatRoomId);
      setupMessageListener(chatRoomId);
    }
  }, [myEmail, email, jobBoardId]);

  const [isReserved, setIsReserved] = useState(false);

  //예약 pai
  const sitterEmail = myEmail
  const handleReservation = async () => {
    const result = await Reser(sitterEmail, jobBoardId);
    if (result) {
      // 예약 성공 처리
      setIsReserved(true); 
      await AsyncStorage.setItem(`reservation_${jobBoardId}`, 'true');
      console.log("예약 성공:", result);
    } else {
      // 예약 실패 처리
      console.error("예약 실패");
    }
  };
  // 예약된거 스토리지에 저장
  useEffect(() => {
    const checkReservation = async () => {
      const reservationStatus = await AsyncStorage.getItem(`reservation_${jobBoardId}`);
      if (reservationStatus === 'true') {
        setIsReserved(true);
      }
    };
  
    checkReservation();
  }, [jobBoardId]);

  const setupMessageListener = (chatRoomId) => {
    
    const messageRef = ref(rdb, `messages/${chatRoomId}`);
    onValue(messageRef, (snapshot) => {
      const firebaseMessages = [];
      snapshot.forEach((childSnapshot) => {
        const key = childSnapshot.key;
        const value = childSnapshot.val();
        firebaseMessages.push({
          _id: key,
          text: value.text,
          createdAt: new Date(value.createdAt),
          user: {
            _id: value.user._id,
            name: value.user._id === myEmail ? myNickName : value.user.name,
            avatar: value.user._id === myEmail ? profileImg : value.user.avatar
          }
        });
      
      });
      firebaseMessages.reverse();
      setMessages(firebaseMessages);
    });
  
    return () => off(messageRef);
    
  };
  const onSend = useCallback((newMessages = []) => {
    if (myEmail && email) {
      const chatRoomId = createChatRoomId(myEmail, email, jobBoardId);
      newMessages.forEach((message) => {
        const messageRef = ref(rdb, `messages/${chatRoomId}`);
        push(messageRef, {
          text: message.text,
          createdAt: serverTimestamp(),
          user: {
            _id: myEmail,
            name: myNickName,
            avatar: profileImg 
          }
        });
  
        // 채팅방 정보 업데이트
        const chatRoomInfoRef = ref(rdb, `chatRooms/${chatRoomId}`);


        set(chatRoomInfoRef, {
          lastMessage: message.text,
          lastMessageTime: serverTimestamp(),
        
          participants: [myEmail, email,jobBoardId],
          jobDetails: { 
            title,
            payment,
            imageUrl,
            nickName,
          },
          otherUserProfileImage: profileImg
        });
    
      });
    }
  }, [myEmail, email, jobBoardId, title, payment, imageUrl, nickName, profileImg]);
  

  // 여기 아래부터는 스타일
  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: 'skyblue',
          },
          left: {
            backgroundColor: '#606060',
          },
        }}
        textStyle={{
          right: {
            color: '#fff',
          },
          left: {
            color: '#fff',
          },
        }}
      />
    );
  };

  const navigateToJobDetail = () => {
    navigation.navigate("WalkStatus"); 
  };

  const JobInfoHeader = ({ title, payment, onPress }) => {
    const displayTitle = title.length > 12 ? `${title.slice(0, 12)}...` : title;
    return (
      <TouchableOpacity style={styles.jobInfoContainer} onPress={handleReservation}>
      <Image source={{ uri: imageUrl }} style={styles.jobImage} />
      <View style={styles.jobDetailsContainer}>
        <View>
          <Text style={styles.jobTitle}>{displayTitle}</Text>
          <Text style={styles.jobPayment}>{payment}원</Text>
        </View>
        <View style={styles.reservationButton}>
          <Text style={styles.reservationButtonText}>{isReserved ? '예약중' : '예약하기'}</Text>
        </View>
      </View>
    </TouchableOpacity>
    );
  };

  const renderInputToolbar = (props) => {
    return (
      <InputToolbar
        {...props}
        containerStyle={{
          borderRadius: 5,
          margin: 0,
          backgroundColor: '#f2f2f2',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.2,
          shadowRadius: 2,
        }}
      />
    );
  };


  return (
    <ImageBackground 
      source={require('../../assets/main/66.jpg')} 
      style={{ flex: 1 }}
      resizeMode='cover'
    >
      <View style={{ flex: 1 }}>
        <JobInfoHeader
          title={title}
          payment={payment}
        />
        <GiftedChat
          messages={messages}
          onSend={(newMessages) => onSend(newMessages)}
          user={{
            _id: myEmail,
            name: myNickName,
            avatar: profileImg
          }}
          renderBubble={renderBubble}
          renderInputToolbar={renderInputToolbar}
          placeholder='채팅을 입력해주세요'
        />
      </View>
    </ImageBackground>
  );
}
 

const styles = StyleSheet.create({
  jobInfoContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#B4D6D5',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#fff',
  },
  jobDetailsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 10, // Adjust as needed
  },
  reservationButton: {
    backgroundColor: 'skyblue',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  reservationButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  jobImage: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 10,
  },
  jobTextContainer: {
    flex: 1,
  },
  jobTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  jobPayment: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft:5,
  },
});
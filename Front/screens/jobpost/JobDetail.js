import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Carousel from "react-native-snap-carousel";
import axios from "axios";
import basicImg from "../../assets/mypage/basic.png";


export default function JobDetail({ route, navigation }) {
  const { jobDetail } = route.params;
  const jobBoardId = jobDetail.jobBoardId
  const [isLiked, setIsLiked] = useState(false);

  // console.log(route)
  console.log("jobDetail", jobDetail);
  console.log(jobBoardId);

  const fetchLikedPosts = async () => {
    try {
      const token = await AsyncStorage.getItem('refreshToken');
      const response = await axios.get('https://kkori.kr/api/job-board/like/all', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const likedPosts = response.data; // 받아온 게시물 데이터

      // 현재 게시물의 ID가 좋아요한 목록에 있는지 확인
      const isPostLiked = likedPosts.some(post => post.jobBoardId === jobBoardId);
      setIsLiked(isPostLiked);

    } catch (error) {
      console.error('좋아요한 게시물 목록 가져오기 실패:', error);
    }
  };

  useEffect(() => {
    fetchLikedPosts();
  }, []);

  useEffect(() => {
    console.log("isLiked 상태:", isLiked);
  }, [isLiked]);

  // 하트가 선택됐는지

  const toggleLike = async () => {
    try {
      const token = await AsyncStorage.getItem('refreshToken');
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      if (isLiked) {
        // 좋아요가 이미 눌러져 있으면 DELETE 요청을 보냄
        await axios.delete(`https://kkori.kr/api/job-board/like/delete-like/${jobBoardId}`, { headers });
      } else {
        // 좋아요가 눌러져 있지 않으면 POST 요청을 보냄
        await axios.post(`https://kkori.kr/api/job-board/like/${jobBoardId}`, {}, { headers });
      }

      // 상태 업데이트
      setIsLiked(!isLiked);

    } catch (error) {
      console.error('Like 요청 실패:', error);
    }
  };

  const goToChatRoom = () => {
    navigation.navigate("ChatRoom", {
      title: jobDetail.title,
      nickName: jobDetail.nickName,
      location: jobDetail.locationResponse,
      payment: jobDetail.payment,
      content: jobDetail.content,
      email: jobDetail.email,
      jobBoardId: jobDetail.jobBoardId,
      imageUrl : jobDetail.dogs[0].imageUrl,
      dogs:jobDetail.dogs,
      profileImage:jobDetail.profileImage

    });
  };
 

  const { width: screenWidth } = Dimensions.get("window");
  const renderItem = ({ item, index }) => {
    return (
      <View style={{ flex: 1 }}>
        <Image source={{ uri: item.imageUrl }} style={styles.image} />
      </View>
    );
  };
  console.log('sssesdsd:',jobDetail)
  return (
    <View style={styles.flexContainer}>
      <ScrollView style={styles.container}>
        <Carousel
          data={jobDetail.dogs}
          renderItem={renderItem}
          sliderWidth={screenWidth}
          itemWidth={400}
          windowSize={20}
        />

        <View style={styles.detailContainer}>
          <Text style={styles.title}>{jobDetail.title}</Text>

          <View style={styles.userDetails}>
            <Image
              source={jobDetail.profileImage ? { uri: jobDetail.profileImage } : basicImg}
              style={styles.userProfilePic}
            />
            <Text style={styles.nickName}>{jobDetail.nickName}</Text>
          </View>
          <View style={styles.locationContainer}>
            <Ionicons name="location-sharp" size={16} color="skyblue" />
            <Text style={styles.location}>
              {jobDetail.locationResponse.city}
              {jobDetail.locationResponse.dong}
            </Text>
          </View>
          <Text style={styles.price}>{jobDetail.payment}원</Text>
          <Text style={styles.content}>{jobDetail.content}</Text>
          {jobDetail.dogs.map((dog, index) => (
            <View style={styles.dogContainer} key={dog.dogId}>
              <Image style={styles.dogImg} source={{ uri: dog.imageUrl }} />
              <View style={styles.dogContant}>
                <Text style={styles.dogName}>
                  {dog.dogName} ({dog.dogAge}살)
                </Text>
                <View style={styles.dogInfoContainer}>
                  <View style={styles.dogInfo}>
                    <Image
                      style={styles.Emg1}
                      source={require("../../assets/mypage/emdog.png")}
                    />
                    <Text> {dog.dogBreed} </Text>
                  </View>
                  <View style={styles.dogInfo}>
                    <Image
                      style={styles.Emg2}
                      source={require("../../assets/mypage/gender.png")}
                    />
                    <Text> {dog.gender === "Male" ? "남" : "여"} </Text>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
      {/* Bottom Bar */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={[styles.button, styles.likeButton]}
          onPress={toggleLike}
        >
          <Ionicons
            name="heart"
            size={36}
            color={isLiked ? "#ff6263" : "#666"}
          />
          <Text style={styles.buttonText}></Text>
        </TouchableOpacity>
        <LinearGradient
          colors={["#A6E3E9", "#A6E3E9", "skyblue", "skyblue"]}
          style={[styles.button, styles.chatButton]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <TouchableOpacity
            style={{ flexDirection: "row", alignItems: "center" }}
            onPress={goToChatRoom}
          >
            <Ionicons name="chatbubble-ellipses" size={36} color="#fff" />
            <Text style={styles.buttonText}>채팅하기</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  flexContainer: {
    flex: 1,
  },

  userDetails: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 5,
    paddingBottom: 10,
  },
  userProfilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 15,
  },
  nickName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },

  image: {
    width: "100%",
    height: 300,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
  },
  detailContainer: {
    padding: 20,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    marginTop: -30,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 12,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  location: {
    fontSize: 16,
    color: "#666",
    marginLeft: 5,
  },
  price: {
    fontSize: 18,
    fontWeight: "600",
    color: "skyblue",
    marginBottom: 20,
  },
  content: {
    fontSize: 20,
    color: "#666",
    lineHeight: 24,
    marginBottom: 20,
  },

  bottomBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10, // 패딩을 줄여줍니다
    paddingHorizontal: 20, // 양쪽 패딩을 조금 더 줍니다
    backgroundColor: "#ffffff",
    borderTopWidth: 0, // 테두리를 제거합니다
    elevation: 10, // 그림자를 약간 줄입니다
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    borderRadius: 30,
    elevation: 0,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
    color: "#fff",
  },
  likeButton: {
    flex: 0,
    marginRight: 10,
    paddingLeft: 12,
    paddingRight: 12,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    flexDirection: "row",
  },
  chatButton: {
    flex: 1,
    marginLeft: 10,
  },
  dogContainer: {
    flexDirection: "row",
    width: "100%",
    backgroundColor: "#F6F6F6",
    elevation: 3, // 그림자 추가 (Android)
    shadowColor: "#000", // 그림자 추가 (iOS)
    shadowOpacity: 0.3, // 그림자 추가 (iOS)
    shadowOffset: { width: -1, height: -1 }, // 그림자 추가 (iOS)
    shadowRadius: 2, // 그림자 추가 (iOS)
    borderRadius: 10,
    marginBottom: 30,
    alignItems: "center",
  },
  dogImg: {
    width: 80,
    height: 80,
    borderRadius: 10,
    margin: 10,
    marginRight: 20,
  },
  dogTop: {
    flexDirection: "row",
    alignItems: "center",
    gap: 40,
    marginTop: 10,
    marginLeft: 10,
  },
  dogName: {
    fontSize: 18,
  },
  dogContant: {
    gap: 20,
  },
  dogInfoContainer: {
    flexDirection: "row",
    gap: 30,
  },
  dogInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
  },
  Emg1: {
    width: 20,
    height: 20,
  },
  Emg2: {
    width: 17,
    height: 15,
  },
  dogInfoTxt: {
    fontSize: 16,
  },
});

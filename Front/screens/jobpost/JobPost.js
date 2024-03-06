import React, { useState, useEffect, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  Button,
} from "react-native";
import JobDetail from "./JobDetail";
import AddJob from "./AddJob";
import { AllPost } from "../../api/Post/Post";
import AsyncStorage from "@react-native-async-storage/async-storage";

// const checkAuthentication = async () => {
//   const token = await AsyncStorage.getItem('refreshToken');
//   return !!token; // 토큰이 있으면 true, 없으면 false 반환
// };

// 이미지 서버나 스토리지 생기면 바꿔야함
// const images = [{ image: "https://source.unsplash.com/random/?dog," }];
// const isAuthenticated = await checkAuthentication();
//     if (isAuthenticated) {
//       navigation.navigate("AddJob");
//     } else {
//       alert('로그인 후 이용해주세요.');
//       navigation.navigate('Mainhome', {
//         screen: 'MainPage',
//         // params: { refresh: true },
//       });

//     }

export default function JobPost({ navigation, route }) {
  useFocusEffect(
    useCallback(() => {
      // route.params.refresh 값이 true일 때만 새로고침
      if (route.params?.refresh) {
        fetchData(); // 게시물 목록을 다시 불러오는 함수
      }
    }, [route.params?.refresh])
  );

  const goToAddJob = () => {
    navigation.navigate("AddJob");
  };

  const goToMyJobPost = () => {
    navigation.navigate('MyJobPost');
  };

  const [data, setData] = useState("");

  useEffect(() => {
    let isActive = true;
    const fetchData = async () => {
      try {
        const response = await AllPost();

        if (response && response.data && isActive) {
          let postData = Array.isArray(response.data)
            ? response.data
            : [response.data];
          if (route.params?.newPost) {
            // 새로운 게시글을 목록의 맨 앞에 추가
            postData.unshift(route.params.newPost);
          }
          postData.sort(
            (a, b) => parseInt(b.jobBoardId) - parseInt(a.jobBoardId)
          );
          setData(postData);
          console.log(response.data)
        }
      } catch (e) {
        console.error("게시글을 불러오는 데 실패했습니다", e);
      }
    };

    fetchData();

    return () => {
      isActive = false;
    };
  }, [route.params]);

  const renderItem = ({ item }) => {
    const imageUrl = item.dogs && item.dogs.length > 0 ? item.dogs[0].imageUrl : null;
    const displayTitle = item.title.length > 12 ? `${item.title.slice(0, 12)}...` : item.title;
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() =>
          navigation.navigate("JobDetail", {
            jobDetail: item,
          })
        }

      >

        {/* <Image source={{ uri: images[0].image }} style={styles.image} /> */}
        <Image source={{ uri: imageUrl }} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{displayTitle}</Text>
          <Text style={styles.description}>
            {item.locationResponse.city} {item.locationResponse.dong}
          </Text>
          <Text style={styles.price}>{item.payment}원</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.jobBoardId.toString()}
      />
      <TouchableOpacity style={styles.myButton} onPress={goToMyJobPost}>
        <Text style={styles.myButtonText}>My</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.addButton} onPress={goToAddJob}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "white",
    marginBottom: 12,
    padding: 1,
    borderRadius: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },

  image: {
    width: 110,
    height: 110,
    borderRadius: 4,
    marginRight: 18,
    resizeMode: "cover",
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: "gray",
    marginBottom: 4,
  },
  price: {
    fontSize: 12,
    fontWeight: "bold",
    color: "skyblue",
  },

  addButton: {
    position: "absolute",
    right: 24,
    bottom: 36,
    width: 56,
    height: 56,
    borderRadius: 150,
    backgroundColor: "skyblue",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  addButtonText: {
    fontSize: 40,
    color: "white",
  },
  myButton: {
    position: "absolute",
    right: 24,
    bottom: 100, // 'Add' 버튼보다 위에 위치
    width: 56,
    height: 56,
    borderRadius: 150,
    backgroundColor: "orange", // 다른 색상을 사용
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  myButtonText: {
    fontSize: 20,
    color: "white",
    fontWeight: 'bold'
  },
});

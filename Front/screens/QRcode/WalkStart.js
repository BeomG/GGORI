import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

function WalkStart({ route, navigation }) {
  const postData = route.params.data;

  const [selectedPostIndex, setSelectedPostIndex] = useState(null);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}.${month}.${day}`;
  };

  console.log("walkstart", postData);

  return (
    <View style={styles.container}>
      <Text style={styles.containerTxt}>
        시작할 산책 게시물을 선택하고 시작해 주세요.
      </Text>
      <ScrollView style={{ flex: 1 }}>
        {postData.map((post, index) => (
          <TouchableOpacity
            style={[
              styles.postContainer,
              // 선택된 게시물이면 배경색을 변경
              {
                backgroundColor:
                  index === selectedPostIndex ? "#b3d9ff" : "#fff",
              },
            ]}
            key={index}
            // 게시물을 선택하면 selectedPostIndex를 업데이트
            onPress={() => {
              if (selectedPostIndex === index) {
                setSelectedPostIndex(null);
              } else {
                setSelectedPostIndex(index);
              }
            }}
          >
            <View style={styles.post}>
              <Text style={styles.postTitle}>{post.title}</Text>
              <Text style={styles.postContent}>시급 : {post.payment}원</Text>
              <Text style={styles.postContent}>
                위치 : {post.locationResponse.city} {post.locationResponse.dong}
              </Text>
            </View>
            <Text style={styles.dayTxt}>{formatDate(post.createdTime)}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <TouchableOpacity
        style={styles.btn}
        // 산책 시작을 누르면 선택된 게시물 정보를 '산책현황'으로 넘김
        onPress={() =>
          navigation.navigate("산책현황", { data: postData[selectedPostIndex] })
        }
      >
        <Text style={styles.btnTxt}> 산책 시작 </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  containerTxt: {
    marginLeft: "5%",
    marginTop: "2%",
  },
  btn: {
    width: "90%",
    height: 50,
    backgroundColor: "#58A9D7",
    margin: "5%",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  btnTxt: {
    color: "white",
    fontSize: 20,
  },
  postContainer: {
    width: "90%",
    height: 120,
    backgroundColor: "white",
    borderBlockColor: "black",
    flexDirection: "row",
    borderRadius: 10,
    elevation: 3, // 그림자 추가 (Android)
    shadowColor: "#000", // 그림자 추가 (iOS)
    shadowOpacity: 0.3, // 그림자 추가 (iOS)
    shadowOffset: { width: -1, height: -1 }, // 그림자 추가 (iOS)
    shadowRadius: 2, // 그림자 추가 (iOS)
    margin: "5%",
  },
  post: {
    flex: 3,
    gap: 10,
    justifyContent: "center",
    marginLeft: "4%",
  },
  postTitle: {
    fontSize: 22,
    fontWeight: "bold",
  },
  postContent: {
    fontSize: 16,
  },
  dayTxt: {
    marginRight: "5%",
    marginTop: "25%",
  },
});

export default WalkStart;

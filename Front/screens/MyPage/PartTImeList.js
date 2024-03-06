import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { PTList, WalkInfo } from "../../api/MyPage/PartTime";

function PartTimeList({ navigation }) {
  const [walks, setWalks] = useState([]);

  const fetchWalks = async () => {
    try {
      const res = await PTList();
      if (res) {
        setWalks(res.data);
      }
    } catch (error) {
      console.error("Error fetching Walks:", error);
    }
  };

  useEffect(() => {
    fetchWalks();
  }, []);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}.${month}.${day}`;
  };

  console.log(walks);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={styles.PartTimeListContainer}>
        {walks.map((walk) => (
          <TouchableOpacity
            key={walk.jobBoardId}
            style={styles.PT}
            onPress={() =>
              navigation.navigate("산책 상세정보", { postId: walk.jobBoardId })
            }
          >
            <View style={styles.PTcontent}>
              <Text style={styles.PTtitle}>{walk.title}</Text>
              <Text style={styles.bold}>시급 : {walk.payment}원</Text>
              <Text style={styles.bold}>
                위치 : {walk.locationResponse.city} {walk.locationResponse.dong}
              </Text>
            </View>
            <Text style={{ marginTop: "22%", color: "grey" }}>
              {formatDate(walk.createdTime)}
            </Text>
            <Image
              style={styles.img}
              source={require("../../assets/mypage/Arrow.png")}
            />
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  PartTimeListContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
    backgroundColor: "white",
  },
  PT: {
    width: "90%",
    height: 120,
    flexDirection: "row",
    backgroundColor: "white",
    borderBlockColor: "black",
    borderRadius: 10,
    elevation: 3, // 그림자 추가 (Android)
    shadowColor: "#000", // 그림자 추가 (iOS)
    shadowOpacity: 0.3, // 그림자 추가 (iOS)
    shadowOffset: { width: -1, height: -1 }, // 그림자 추가 (iOS)
    shadowRadius: 2, // 그림자 추가 (iOS)
    gap: 25,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 5,
  },
  PTtitle: {
    fontSize: 22,
    fontWeight: "bold",
  },
  PTcontent: {
    gap: 13,
  },
  img: {
    width: "7%",
    height: 30,
  },
  bold: {
    fontWeight: "bold",
  },
});
export default PartTimeList;

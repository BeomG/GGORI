import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import DogList from "./DogList";
import { AllDog } from "../../api/MyPage/MyDog";

function MyDog({ navigation }) {
  const [refresh, setRefresh] = useState(false);
  const [dogs, setDogs] = useState([]);

  const handleDogClick = (dogId) => {
    navigation.navigate("강아지 상세정보", {
      dogId,
      refresh: () => setRefresh(!refresh),
    });
  };

  useEffect(() => {
    fetchDogs();
  }, [refresh]);

  const fetchDogs = async () => {
    try {
      const response = await AllDog();
      if (response) {
        setDogs(response.data);
      }
    } catch (error) {
      console.error("Error fetching dogs:", error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          navigation.navigate("강아지 등록", {
            refresh: () => setRefresh(!refresh),
          });
        }}
      >
        <Text style={{ fontSize: 18 }}>등록</Text>
      </TouchableOpacity>

      <DogList dogs={dogs} onDogClick={handleDogClick} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  btn: {
    width: "25%",
    height: 50,
    backgroundColor: "white",
    elevation: 2, // 그림자 추가 (Android)
    shadowColor: "#000", // 그림자 추가 (iOS)
    shadowOpacity: 0.3, // 그림자 추가 (iOS)
    shadowOffset: { width: -1, height: -1 }, // 그림자 추가 (iOS)
    shadowRadius: 2, // 그림자 추가 (iOS)
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    marginLeft: "70%",
    marginTop: 5,
    marginBottom: 1,
  },
});
export default MyDog;

import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import DogList from "./DogList";
import { AllDog } from "../../api/MyPage/MyDog";

function MyDogWalk({ navigation }) {
  const [dogs, setDogs] = useState([]);

  useEffect(() => {
    fetchDogs();
  }, []);

  const fetchDogs = async () => {
    try {
      const response = await AllDog();
      if (response && response.data) {
        setDogs(response.data);
      } else {
        setDogs([]); // response.data가 없는 경우 빈 배열을 설정합니다.
      }
    } catch (error) {
      console.error("Error fetching dogs:", error);
      setDogs([]); // 에러가 발생한 경우 빈 배열을 설정합니다.
    }
  };

  const handleDogClick = (dogId) => {
    navigation.navigate("MyDogWalkList", { dogId: dogId });
  };

  return (
    <View style={styles.container}>
      <Text style={{ margin: 5, marginLeft: 20 }}>
        산책 내역을 확인할 강아지를 선택해 주세요.
      </Text>
      <DogList dogs={dogs} onDogClick={handleDogClick} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
export default MyDogWalk;

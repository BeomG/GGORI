import React, { useState, useEffect, } from "react";
import { View, Text, StyleSheet, ScrollView, Image, ActivityIndicator, TouchableOpacity } from "react-native";
import { LDog } from "../../api/LostDog/LostDog";
import { useFocusEffect } from '@react-navigation/native';

function LostDog({ navigation }) {
  const [dogs, setDogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await LDog();
      setDogs(response.data);
      console.log(dogs)
      setLoading(false);
    } catch (e) {
      console.error("게시글을 불러오는 데 실패했습니다", e);
      setLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
      return () => { };
    }, [])
  );
  const handleDogClick = (dogId) => {
    navigation.navigate("LostDogDetail", { dogId });
  };

  const handleMyLostDog = () => {
    navigation.navigate("MyLostDog"); // MyLostDog 화면으로 이동
    console.log("MyLostDog 화면으로 이동");
  };

  const handleAddDog = () => {
    navigation.navigate("LostDogAdd"); // 컴포넌트 레벨의 navigation 객체 사용
    console.log("분실견 등록");
  };

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
          {dogs.length > 0 ? (
            dogs.map((dog) => (
              <TouchableOpacity
                key={dog.dogId}
                style={styles.dogContainer}
                onPress={() => handleDogClick(dog.dogId)}
              >
                <View style={styles.dog}>
                  <Image style={styles.dogImg} source={{ uri: dog.imageUrl }} />
                  <View style={styles.dogContent}>
                    <View style={[styles.content, { alignItems: "flex-end" }]}>
                      <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                        {dog.dogName}
                      </Text>
                      <Text style={{ fontSize: 14 }}>{dog.dogAge}세</Text>
                    </View>
                    <View style={[styles.content, { alignItems: "center" }]}>
                      <Image
                        style={{ width: "9%", height: 15, marginTop: 4 }}
                        source={require("../../assets/mypage/gender.png")}
                      />
                      <Text style={{ fontSize: 14, fontWeight: "bold" }}>
                        {dog.gender === "Male" ? "남" : "여"}
                      </Text>
                    </View>
                    <View style={[styles.content, { alignItems: "center" }]}>
                      <Image
                        style={{ width: "10%", height: 15, marginTop: 4 }}
                        source={require("../../assets/mypage/emdog.png")}
                      />
                      <Text style={{ fontSize: 14, fontWeight: "bold" }}>
                        {dog.dogBreed}
                      </Text>
                    </View>
                  </View>
                  <Image
                    style={styles.arrow}
                    source={require("../../assets/mypage/Arrow.png")}
                  />
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <View style={styles.noDogsContainer}>
              <Text style={styles.noDogsText}>등록할 분실견이 없습니다</Text>
            </View>
          )}
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.myButton} onPress={handleMyLostDog}>
        <Text style={styles.myButtonText}>My</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.addButton} onPress={handleAddDog}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  dogCard: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  dogImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 16,
  },
  details: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  breed: {
    fontSize: 15,
    color: '#666',
  },
  info: {
    fontSize: 14,
    color: '#666',
  },
  scrollView: {
    flex: 1,
  },
  addButton: {
    position: 'absolute',
    bottom: 36,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'skyblue',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
  lbuttonIcon: {
    width: '120%',
    height: '120%',
  },
  myButton: {
    position: 'absolute',
    bottom: 105, // 또는 적절한 위치 조정
    right: 20,
    width: 62,
    height: 62,
    borderRadius: 30,
    backgroundColor: 'orange',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
  myButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  noDogsView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  noDogsText: {
    fontSize: 16,
    color: '#666',
    fontStyle: 'italic',
  },
  info: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4, // Add some spacing between info lines
  },
  addButtonText: {
    fontSize: 40,
    color: "white",
  },



  container: {
    flex: 1,
    backgroundColor: "white",
    width: "100%",
  },
  dogContainer: {
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
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 5,
    marginLeft: "5%",
    padding: 5,
  },
  dog: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    gap: 10,
  },
  dogImg: {
    flex: 2,
    height: 110,
    borderRadius: 10,
  },
  dogContent: {
    flex: 3,
    gap: 13,
  },
  content: {
    flexDirection: "row",
    gap: 10,
  },
  arrow: {
    width: "7%",
    height: 30,
  },
  noDogsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDogsText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666',
  },
});

export default LostDog;

import React, { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";

function DogList({ dogs, onDogClick }) {
  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={styles.container}>
        {dogs &&
          dogs.map((dog) => (
            <TouchableOpacity
              key={dog.dogId}
              style={styles.dogContainer}
              onPress={() => {
                if (onDogClick) {
                  onDogClick(dog.dogId); // 강아지의 id를 인자로 함수 실행
                }
              }}
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
          ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
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
});

export default DogList;

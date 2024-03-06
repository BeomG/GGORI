import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

function SmallModal() {
  return (
    <View style={styles.container}>
      <View style={styles.Top}>
        <View style={styles.WalkTime}>
          <Text style={{ fontSize: 20, fontWeight: "bold", color: "#0B80C5" }}>
            산책시간
          </Text>
          <Text style={{ fontSize: 23, fontWeight: "bold" }}>00 : 00 : 00</Text>
        </View>
        <Text style={styles.DogName}>뽀삐</Text>
        <Image
          style={styles.DogImage}
          source={require("../../../assets/mypage/TestDog.png")}
        />
      </View>

      <View style={styles.Mid}>
        <View style={[styles.MidInfo, { marginLeft: 10 }]}>
          <View style={styles.MidContent}>
            <Image
              style={{ width: 20, height: 20 }}
              source={require("../../../assets/mypage/walkdog.png")}
            />
            <Text style={{ fontWeight: "bold", color: "grey" }}>산책거리</Text>
          </View>
          <View style={styles.MidContent}>
            <Text>0.0</Text>
            <Text>km</Text>
          </View>
        </View>
        <View style={styles.MidInfo}>
          <View style={styles.MidContent}>
            <Image
              style={{ width: 15, height: 15 }}
              source={require("../../../assets/mypage/fire.png")}
            />
            <Text style={{ fontWeight: "bold", color: "grey" }}>운동량</Text>
          </View>
          <View style={styles.MidContent}>
            <Text>000</Text>
            <Text>kcal</Text>
          </View>
        </View>
      </View>

      <View style={styles.Bottom}>
        <TouchableOpacity
          style={[styles.ModalBtn, { backgroundColor: "#D9D9D9" }]}
        >
          <Text style={styles.BtnTxt}>채팅 내역</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.ModalBtn, { backgroundColor: "#58A9D7" }]}
        >
          <Text style={[styles.BtnTxt, { color: "white" }]}>게시물 보기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
    width: "100%",
    height: "100%",
    padding: 15,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  Top: {
    flex: 2,
    flexDirection: "row",
  },
  Mid: {
    flex: 0.8,
    backgroundColor: "#DEEEF7",
    flexDirection: "row",
    borderRadius: 10,
  },
  Bottom: {
    flex: 1,
    flexDirection: "row",
    gap: 10,
  },
  WalkTime: {
    flex: 4,
    gap: 10,
    justifyContent: "center",
  },
  DogName: {
    flex: 1,
    fontSize: 15,
    fontWeight: "bold",
  },
  DogImage: {
    flex: 2,
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  MidInfo: {
    flex: 1,
    flexDirection: "row",
  },
  MidContent: {
    flex: 1,
    flexDirection: "row",
    gap: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  ModalBtn: {
    flex: 1,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  BtnTxt: {
    fontSize: 17,
    fontWeight: "bold",
  },
});

export default SmallModal;

import React from "react";
import { Image, Text, View, StyleSheet, TouchableOpacity } from "react-native";

function BigModal() {
  return (
    <View style={styles.container}>
      <Text style={styles.ModalTitle}>Title</Text>
      <View style={styles.ModalTop}>
        <View style={styles.WalkTime}>
          <View style={{ flex: 3, justifyContent: "center", gap: 15 }}>
            <Text style={styles.timeTxt}>산책 시간</Text>
            <Text style={[styles.timeTxt2]}>00 : 00 : 00</Text>
          </View>
          <View>
            <Text style={styles.DogName}> 뽀삐 </Text>
          </View>
          <Image
            style={styles.ModalImg}
            source={require("../../../assets/mypage/TestDog.png")}
          />
        </View>
        <View style={styles.WalkInfo}>
          <View style={[styles.WalkinfoContent, { flex: 1, gap: 10 }]}>
            <View style={[styles.WalkinfoContent, { gap: 5 }]}>
              <Image
                style={{ width: 30, height: 30 }}
                source={require("../../../assets/mypage/walkdog.png")}
              />
              <Text style={[styles.WalkInfoTxt, { color: "grey" }]}>
                산책 거리
              </Text>
            </View>
            <View style={styles.WalkinfoContent}>
              <Text style={styles.WalkInfoTxt}>0.0</Text>
              <Text style={styles.WalkInfoTxt}>km</Text>
            </View>
          </View>
          <View style={[styles.WalkinfoContent, { flex: 1, gap: 10 }]}>
            <View style={[styles.WalkinfoContent, { gap: 5 }]}>
              <Image
                style={{ width: 20, height: 20 }}
                source={require("../../../assets/mypage/fire.png")}
              />
              <Text style={[styles.WalkInfoTxt, { color: "grey" }]}>
                운동량
              </Text>
            </View>
            <View style={styles.WalkinfoContent}>
              <Text style={styles.WalkInfoTxt}>000</Text>
              <Text style={styles.WalkInfoTxt}>kcal</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.ModalMid}>
        <Text style={styles.SmallTitle}>산책 일시</Text>
        <View>
          <Text style={{ fontSize: 16 }}>2023년 00월 00일</Text>
          <View style={{ flexDirection: "row", gap: 17, marginTop: 8 }}>
            <Text style={{ fontSize: 16 }}>15시 00분</Text>
            <Text style={{ fontSize: 16 }}>~</Text>
            <Text style={{ fontSize: 16 }}>15시 30분</Text>
          </View>
        </View>
      </View>

      <View style={styles.ModalBottom}>
        <Text style={styles.SmallTitle}>견주</Text>
        <Text style={{ fontSize: 16 }}>최우진</Text>
      </View>

      <View style={styles.ModalBtnBox}>
        <TouchableOpacity
          style={[styles.ModalBtn, { backgroundColor: "#D9D9D9" }]}
        >
          <Text style={styles.BtnText}>채팅 내역</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.ModalBtn, { backgroundColor: "#58A9D7" }]}
        >
          <Text style={[styles.BtnText, { color: "white" }]}>게시물 보기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    gap: 5,
    padding: 15,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  ModalTitle: {
    fontSize: 25,
    fontWeight: "bold",
  },
  ModalTop: {
    flex: 4,
    gap: 15,
  },
  ModalMid: {
    flex: 2,
    gap: 8,
  },
  ModalBottom: {
    flex: 1,
    gap: 8,
  },
  ModalBtnBox: {
    flex: 1,
    flexDirection: "row",
    gap: 10,
    marginTop: 10,
  },
  WalkTime: {
    flexDirection: "row",
    flex: 2,
  },
  timeTxt: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#0B80C5",
  },
  timeTxt2: {
    fontSize: 23,
    fontWeight: "bold",
  },
  DogName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  ModalImg: {
    flex: 2,
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  WalkInfo: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#DEEEF7",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "space-between",
  },
  WalkinfoContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  WalkInfoTxt: {
    fontWeight: "bold",
    fontSize: 14,
  },
  ModalBtn: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  BtnText: {
    fontSize: 17,
    fontWeight: "bold",
  },
  SmallTitle: {
    fontSize: 16,
    color: "#0B80C5",
    fontWeight: "bold",
  },
});

export default BigModal;

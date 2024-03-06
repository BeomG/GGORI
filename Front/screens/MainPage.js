import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import Carousel from "react-native-reanimated-carousel";
import LottieView from "lottie-react-native";

function MainPage({ navigation }) {
  // 온프레스

  const goToWalkList = () => {
    navigation.navigate("산책현황");
  };
  const goToMap = () => {
    navigation.navigate("Map");
  };
  const { width } = Dimensions.get("window");

  const bannerData = [
    { source: require("../assets/main/1.png") },
    { source: require("../assets/main/2.png") },
    { source: require("../assets/main/3.png") },
    { source: require("../assets/main/4.png") },
  ];

  // 로티
  const animation = useRef(null);

  const renderBannerItem = ({ item }) => (
    <Image source={item.source} style={styles.banner} />
  );

  return (
    <View style={styles.container}>
      {/* 경계선 */}
      <View style={styles.borderLine} />

      {/* 위쪽 */}
      <View style={[styles.section, { flex: 2, flexDirection: "row" }]}>
        <TouchableOpacity
          style={[styles.button, styles.buttonMap]}
          onPress={goToMap}
        >
          <View style={styles.buttonContent}>
            {/* <Image source={require('../assets/main/지도로찾기.png')} style={styles.buttonImage} /> */}
            <View style={styles.animationContainer}>
              <LottieView
                autoPlay
                ref={animation}
                style={styles.lottie}
                source={require("../assets/lottie/earth.json")}
              />
            </View>
            <Text style={styles.buttonText}>지도로 찾기</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.buttonBoard]}
          onPress={goToWalkList}
        >
          <View style={styles.buttonContent}>
            <View style={styles.animationContainer}>
              <LottieView
                autoPlay
                ref={animation}
                style={styles.lottie2}
                source={require("../assets/lottie/dog2.json")}
              />
            </View>
            <Text style={styles.buttonText}>산책 현황</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* 가운데 */}
      <View style={[styles.section, { flex: 1 }]}>
        <Carousel
          loop
          width={width}
          height={styles.banner.height}
          data={bannerData}
          autoPlay={true}
          autoPlayInterval={2000}
          scrollAnimationDuration={1500}
          renderItem={renderBannerItem}
        />
      </View>

      {/* 아래쪽 */}
      <View style={[styles.section, { flex: 1.5, flexDirection: "row" }]}>
        <TouchableOpacity
          style={[styles.button, styles.qrscan, { flex: 2 }]}
          onPress={() => navigation.navigate("Qrcode")}
        >
          <View style={styles.buttonContent}>
            {/* <Image
            source={require("../assets/main/스캔.png")}
            style={styles.buttonImage}
          /> */}
            <View style={styles.animationContainer}>
              <LottieView
                autoPlay
                ref={animation}
                style={styles.lottie}
                source={require("../assets/lottie/qr.json")}
              />
            </View>
            <Text style={styles.buttonText}>QR 스캔</Text>
          </View>
        </TouchableOpacity>

        <View style={{ flex: 1.5 }}>
          <TouchableOpacity
            style={[styles.button, styles.lostdog, { flex: 2 }]}
            onPress={() => navigation.navigate("LostDog")}
          >
            <View style={[styles.buttonContent]}>
              <Image
                source={require("../assets/main/분실견.png")}
                style={styles.buttonImage2}
              />
              <Text style={[styles.buttonText2]}>분실견{"\n"} 신고</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.kingdog, { flex: 2 }]}
            onPress={() => navigation.navigate("WalkKing")}
          >
            <View style={[styles.buttonContent, { flexDirection: "row" }]}>
              <Text style={styles.buttonText3}>이달의{"\n"} 산책왕</Text>
              <Image
                source={require("../assets/main/산책왕.png")}
                style={styles.buttonImage3}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  animationContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 0,
  },
  lottie: {
    width: "100%",
    height: 240,
  },
  lottie2: {
    width: "100%",
    height: 150,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#EEF7FB",
  },
  titleContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  titleImage: {
    width: 150,
    height: 75,
    resizeMode: "contain",
  },
  borderLine: {
    borderBottomWidth: 1,
    borderBottomColor: "grey",
  },

  // 버튼배경색들
  buttonMap: {
    backgroundColor: "#FFD1B1",
  },

  buttonBoard: {
    backgroundColor: "#EFD9AE",
  },
  qrscan: {
    backgroundColor: "#FFE0C9",
  },
  lostdog: {
    backgroundColor: "#E7C9FF",
  },
  kingdog: {
    backgroundColor: "#8BD6FC",
  },

  banner: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  buttonContent: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    // flexDirection: 'column',
    // padding: 10,
  },
  buttonText: {
    fontSize: 32, // 텍스트 크기 조정
    textAlign: "center",
    color: "white",
    marginTop: 5, // 이미지와 텍스트 사이의 간격
    textShadowColor: "rgba(0, 0, 0, 0.2)",
    textShadowOffset: { width: -4, height: 4 },
    textShadowRadius: 10,
    fontWeight: "bold",
  },
  buttonText2: {
    fontSize: 27,
    color: "white",
    textAlign: "center", // 텍스트를 중앙 정렬
    textShadowColor: "rgba(0, 0, 0, 0.2)",
    textShadowOffset: { width: -4, height: 4 },
    textShadowRadius: 10,
    fontWeight: "bold",
    position: "absolute",
    paddingRight: 40,
  },
  buttonText3: {
    fontSize: 27,
    color: "white",
    textAlign: "center", // 텍스트를 중앙 정렬
    textShadowColor: "rgba(0, 0, 0, 0.2)",
    textShadowOffset: { width: -4, height: 4 },
    textShadowRadius: 10,
    fontWeight: "bold",
    position: "absolute",
    paddingLeft: 40,
    zIndex: 1,
  },
  buttonImage: {
    width: "90%", // 이미지의 너비 조정
    height: "80%", // 이미지의 높이 조정
    resizeMode: "contain",
  },
  buttonImage2: {
    width: 350,
    height: 120,
    resizeMode: "center",
    marginRight: -70,
    marginBottom: 5,
  },
  buttonImage3: {
    width: 350,
    height: 120,
    resizeMode: "center",
    marginLeft: -80,
  },

  section: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  button: {
    flex: 1,
    backgroundColor: "#e0e0e0",
    padding: 10,
    borderRadius: 5,
    margin: 5,
    alignItems: "center",
    elevation: 8,
  },

  image: {
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
});

export default MainPage;

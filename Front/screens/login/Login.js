import React, { useCallback, useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  Button,
  Linking,
  TouchableOpacity,
} from "react-native";
import WebView from "react-native-webview";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LottieView from "lottie-react-native";

function Login({ navigation, onTokenSaved }) {
  const [showWebView, setShowWebView] = useState(false);
  const [nickName, setNickName] = useState("");
  const [profileImg, setProfileImg] = useState("");
  const [hasToken, setHasToken] = useState(false);
  const [isLoginUrl, setIsLoginUrl] = useState(false);
  const [email, setEmail] = useState("");
  const animation = useRef(null);

  const handleNavigationChange = async (navState) => {
    const loginUrlPattern =
      /https:\/\/k9c110\.p\.ssafy\.io\/api\/auth\/naver\/login\?code=.+&state=null/;

    if (navState.url.match(loginUrlPattern)) {
      setIsLoginUrl(true);
      try {
        const matchedCode = navState.url.match(/code=([^&]+)/);
        if (matchedCode && matchedCode[1]) {
          const response = await axios.post("https://kkori.kr/api/auth/naver", {
            authorizationCode: matchedCode[1],
            state: null,
          });

          console.log(response.data, 22);

          setEmail(response.data.email); // 상태에 이메일을 저장합니다.
          await AsyncStorage.setItem("email", response.data.email);

          setEmail(response.data.email); // 상태에 이메일을 저장합니다.
          await AsyncStorage.setItem("memberID", `${response.data.memberId}`);

          if (response.data.profileImg) {
            // profileImg가 null이 아닌 경우
            setProfileImg(response.data.profileImg);
            await AsyncStorage.setItem("profileImg", response.data.profileImg);
          } else {
            // profileImg가 null인 경우
            // 필요한 경우 추가적인 처리를 할 수 있습니다. 예를 들어, 기본 이미지 설정 등
          }

          setNickName(response.data.nickName);
          await AsyncStorage.setItem("nickName", response.data.nickName);
          console.log(response.data.email);
          console.log(response.data.nickName);
          await AsyncStorage.setItem(
            "refreshToken",
            response.data.refreshToken
          );
          if (onTokenSaved) {
            onTokenSaved(); // callback 함수 실행
          }
          setShowWebView(false);
          setHasToken(true);
        }
      } catch (error) {
        // console.error("Error sending the POST request:", error);
      }
    } else {
      setIsLoginUrl(false);
    }
  };

  const handleLoginPress = async () => {
    const token = await AsyncStorage.getItem("refreshToken");
    if (!token) {
      setShowWebView(true);
    }
  };

  const handleLogoutPress = async () => {
    setShowWebView(true);

    setTimeout(async () => {
      setShowWebView(false);
      await AsyncStorage.removeItem("refreshToken");
      setHasToken(false);
      // setnickName("");
    }, 2000);
  };

  useEffect(() => {
    (async () => {
      const token = await AsyncStorage.getItem("refreshToken");
      if (token) {
        const token = await AsyncStorage.getItem("refreshToken");
        if (token) {
          const storedNickName = await AsyncStorage.getItem("nickName");
          const storedProfileImg = await AsyncStorage.getItem("profileImg");
          setHasToken(true);
          if (storedNickName) setNickName(storedNickName);
          if (storedProfileImg) setProfileImg(storedProfileImg);
        }
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      {!showWebView ? (
        <View style={styles.content}>
          {!hasToken ? (
            <>
              <Image
                source={require("../../assets/mypage/welcome.png")} // Replace with your welcome image path
                style={styles.welcomeImage}
              />
              <TouchableOpacity
                onPress={handleLoginPress}
                style={styles.imageButton}
              >
                <Image
                  source={require("../../assets/mypage/네이버로그인.png")}
                  style={styles.imageButtonIcon}
                />
              </TouchableOpacity>
              <LottieView
                autoPlay
                ref={animation}
                style={styles.lottie}
                source={require("../../assets/lottie/logindog.json")}
              />
            </>
          ) : (
            <Button title="로그아웃" onPress={handleLogoutPress} />
          )}
        </View>
      ) : (
        <WebView
          source={{
            uri: hasToken
              ? "https://nid.naver.com/nidlogin.logout"
              : "https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=HDx5SQPMLLEsgzgQEBGk&redirect_uri=https://k9c110.p.ssafy.io/api/auth/naver/login&state=",
          }}
          style={{ opacity: isLoginUrl || hasToken ? 0 : 1 }}
          onNavigationStateChange={handleNavigationChange}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#58A9D7",
  },
  content: {
    flex: 1,
    justifyContent: "center", // This centers the content container vertically
    alignItems: "center", // This centers the content container horizontally
    padding: 10, // This adds some padding around the content
  },
  welcomeImage: {
    height: 100, // Adjust the height as necessary
    resizeMode: "contain", // This will ensure the image fits within the dimensions and maintains aspect ratio
    marginBottom: 10, // Space between the welcome image and the LottieView
  },
  lottie: {
    height: 300, // Adjust the height as necessary
    alignSelf: "center", // Centers the LottieView horizontally
    marginBottom: 20, // Space between the LottieView and the button below it
  },
  imageButton: {
    // No marginTop needed since we're using marginBottom on the LottieView
    height: 50,
    width: 200, // Adjust the width as necessary
    marginBottom: 20,
  },
  imageButtonIcon: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
});

export default Login;
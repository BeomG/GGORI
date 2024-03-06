import React, { useState, useEffect } from "react";
import { WebView } from "react-native-webview";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { MyDetail, MyDetailUpdate } from "../../api/MyPage/MyPage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import basicImg from "../../assets/mypage/basic.png";
import NameEditModal from "./Modal/NameEditModal";
import ImageEditModal from "./Modal/ImageEditModal";

function MyPage({ navigation, onTokenRemoved }) {
  // state 변수를 추가하여 웹뷰의 표시 여부를 결정합니다.
  const [showWebView, setShowWebView] = useState(false);
  const [currentUrl, setCurrentUrl] = useState("");
  const [profileImg, setProfileImg] = useState("");

  // 이미지와 이름 수정을 위한 모달의 상태
  const [showImageModal, setShowImageModal] = useState(false);
  const [showNameModal, setShowNameModal] = useState(false);

  // 이미지와 이름을 수정하는 함수 (실제로는 수정 로직에 맞게 구현)
  const editImage = async (newImage) => {
    setProfileImg(newImage);
    setShowImageModal(false);

    const updatedMydetail = { ...mydetail, profileImg: newImage.uri };
    setMydetail(updatedMydetail);
  };

  const editName = (newName) => {
    setMydetail({ ...mydetail, nickName: newName });
    setShowNameModal(false);
  };

  const handleLogoutPress = async () => {
    setShowWebView(true);
    setCurrentUrl("https://nid.naver.com/nidlogin.logout");

    setTimeout(async () => {
      setShowWebView(false);
      await AsyncStorage.removeItem("refreshToken");

      if (onTokenRemoved) {
        onTokenRemoved();
      }
    }, 2000); // Set timeout for 2 seconds
  };

  const [mydetail, setMydetail] = useState();

  useEffect(() => {
    const fetchMyDetail = async () => {
      const res = await MyDetail();
      if (res) {
        setMydetail(res.data);
      }
    };

    // 토큰이 존재하는지 확인
    AsyncStorage.getItem("refreshToken").then((token) => {
      if (token) {
        // 토큰이 존재하면 MyDetail 함수 호출
        fetchMyDetail();
      }
    });
  }, []);

  console.log(mydetail);

  return (
    <ScrollView style={styles.container0}>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => setShowImageModal(true)}>
          <Image
            source={
              mydetail?.profileImg ? { uri: mydetail.profileImg } : basicImg
            }
            style={styles.mypageImage}
          />
        </TouchableOpacity>
        <View style={styles.textContainer}>
          <TouchableOpacity onPress={() => setShowNameModal(true)}>
            <Text style={styles.nameTag}>{mydetail?.nickName}</Text>
          </TouchableOpacity>
          <Text style={styles.pawText}>발바닥</Text>
        </View>

        {/* 이미지 수정 모달 */}
        <ImageEditModal
          visible={showImageModal}
          onConfirm={editImage}
          onCancel={() => setShowImageModal(false)}
          Img={mydetail?.profileImg}
        />

        {/* 이름 수정 모달 */}
        <NameEditModal
          visible={showNameModal}
          onConfirm={editName}
          onCancel={() => setShowNameModal(false)}
          onApplyUpdate={MyDetailUpdate}
        />
      </View>

      <View style={{ gap: 20 }}>
        <TouchableOpacity
          style={styles.touchmenu}
          onPress={() => {
            if (mydetail.deviceNumber) {
              navigation.navigate("기기 관리");
            } else {
              navigation.navigate("기기 등록");
            }
          }}
        >
          <View style={styles.touchmenu2}>
            <Image
              source={require("../../assets/mypage/Device.png")}
              style={styles.touchimage2}
            ></Image>
            <Text style={styles.touchtext}>기기 관리</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.touchmenu}
          onPress={() => navigation.navigate("알바 내역")}
        >
          <View style={styles.touchmenu2}>
            <Image
              source={require("../../assets/mypage/text.png")}
              style={styles.touchimage}
            ></Image>
            <Text style={styles.touchtext}>알바 내역</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.touchmenu}
          onPress={() => navigation.navigate("나의 강아지")}
        >
          <View style={styles.touchmenu2}>
            <Image
              source={require("../../assets/mypage/dog2.png")}
              style={styles.touchimage3}
            ></Image>
            <Text style={styles.touchtext}>나의 강아지</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.touchmenu}
          onPress={() => navigation.navigate("강아지 산책 내역")}
        >
          <View style={styles.touchmenu2}>
            <Image
              source={require("../../assets/mypage/dog.png")}
              style={styles.touchimage2}
            ></Image>
            <Text style={styles.touchtext}>강아지 산책 내역</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.touchmenu}
          onPress={() => navigation.navigate("Like")}
        >
          <View style={styles.touchmenu2}>
            <Image
              source={require("../../assets/mypage/좋아요.png")}
              style={styles.touchimage2}
            ></Image>
            <Text style={styles.touchtext}>찜 게시글</Text>
          </View>
        </TouchableOpacity>
        {/* <TouchableOpacity
          style={styles.touchmenu}
          // onPress={() => navigation.navigate("내 예약")}
        >
          <View style={styles.touchmenu2}>
            <Image
              source={require("../../assets/mypage/pen.png")}
              style={styles.touchimage}
            ></Image>
            <Text style={styles.touchtext}>이용약관</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.touchmenu}
          // onPress={() => navigation.navigate("내 예약")}
        >
          <View style={styles.touchmenu2}>
            <Image
              source={require("../../assets/mypage/headphone.png")}
              style={styles.touchimage}
            ></Image>
            <Text style={styles.touchtext}>고객센터</Text>
          </View>
        </TouchableOpacity> */}
        <TouchableOpacity style={styles.touchmenu} onPress={handleLogoutPress}>
          <View style={styles.touchmenu2}>
            <Image
              source={require("../../assets/mypage/logout.png")}
              style={styles.touchimage}
            ></Image>
            <Text style={styles.touchtext}>로그아웃</Text>
          </View>
        </TouchableOpacity>
      </View>
      {showWebView && (
        <WebView
          source={{ uri: currentUrl }}
          onNavigationStateChange={(navState) => {
            if (navState.url === "https://nid.naver.com/nidlogin.logout") {
              // The WebView navigated to the logout URL
              // You can add additional logic here if needed
            }
          }}
        />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container0: {
    backgroundColor: "white",
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  mypageImage: {
    width: 70,
    height: 70,
    borderRadius: 50,
    marginRight: 20,
    marginLeft: 25,
    marginTop: 10,
    marginBottom: 10,
  },
  textContainer: {
    flexDirection: "row",
    alignItems: "center", // 가로 정렬
    marginTop: 10,
  },
  nameTag: {
    fontSize: 25,
    marginRight: 150,
    fontWeight: "bold",
  },
  pawText: {
    fontSize: 16,
    color: "gray",
  },
  reservetext: {
    marginTop: 15,
    fontSize: 20,
    fontWeight: "bold",
    paddingLeft: 25,
  },
  reservebox: {
    height: 120,
    width: 350,
    marginLeft: 22,
    marginTop: 10,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
  },
  touchmenu: {
    paddingTop: 20,
    paddingLeft: 25,
  },
  touchmenu2: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  touchtext: {
    fontSize: 20,
    fontWeight: "bold",
  },
  touchimage: {
    height: 23,
    width: 23,
  },
  touchimage2: {
    height: 23,
    width: 28,
  },
  touchimage3: {
    height: 24,
    width: 26,
  },
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  modalView: {
    width: "100%",
    height: "70%",
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    alignItems: "center",
  },
  closeButton: {
    position: "absolute",
    right: 20,
    marginTop: 10,
    padding: 6,
    borderWidth: 1, // 테두리의 두께
    borderColor: "#007BFF", // 테두리의 색상
    borderRadius: 5,
  },
  closeButtonText: {
    fontSize: 16,
    color: "#007BFF", // 원하는 색상으로 설정할 수 있습니다.
  },
});

export default MyPage;

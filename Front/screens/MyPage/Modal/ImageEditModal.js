import React, { useState } from "react";
import {
  Button,
  Image,
  Modal,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import basicImg from "../../../assets/mypage/basic.png";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import { ProfileImgUpdate } from "../../../api/MyPage/MyPage";

function ImageEditModal({ visible, onConfirm, onCancel, Img }) {
  const [image, setImage] = useState(Img);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const resizedImage = await ImageManipulator.manipulateAsync(
        result.assets[0].uri,
        [{ resize: { width: 800 } }], // 여기서 이미지 크기를 조절합니다.
        { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG } // 이미지 포맷과 압축률을 설정합니다.
      );

      const dogPhoto = await fetch(resizedImage.uri);
      const blob = await dogPhoto.blob();
      setImage({
        uri: resizedImage.uri,
        blob,
      });
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.container}>
          <Text>이미지를 눌러서 원하는 사진을 선택하세요</Text>
          <View style={styles.container2}>
            <TouchableOpacity onPress={pickImage}>
              <Image
                style={styles.Img}
                source={image ? { uri: image.uri } : basicImg}
              />
            </TouchableOpacity>
            <View style={styles.btnBox}>
              <TouchableOpacity
                style={[styles.btn, { backgroundColor: "#58A9D7" }]}
                onPress={async () => {
                  // '수정 완료' 버튼을 누르면 이미지를 수정하고, 수정된 이미지를 서버에 업데이트합니다.
                  const updateResult = await ProfileImgUpdate({
                    profileImg: image,
                  });

                  if (updateResult) {
                    onConfirm(image);
                  } else {
                    console.error("프로필 이미지 업데이트에 실패했습니다.");
                  }
                }}
              >
                <Text style={{ color: "white" }}> 수정 완료 </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.btn, { backgroundColor: "#D9D9D9" }]}
                onPress={onCancel}
              >
                <Text> 닫기 </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
    height: "100%",
  },
  container: {
    height: "33.3%", // 화면의 3분의 2를 차지
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    gap: 40,
  },
  container2: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 50,
  },
  Img: {
    width: 130,
    height: 130,
    borderRadius: 300,
    borderColor: "grey",
    borderWidth: 1,
  },
  btnBox: {
    gap: 25,
  },
  btn: {
    width: 80,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
});

export default ImageEditModal;

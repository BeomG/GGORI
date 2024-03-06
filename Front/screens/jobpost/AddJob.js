import React, { useState, useEffect } from "react";
import {
  Image,
  View,
  Platform,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  Modal,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Postcode from "@actbase/react-daum-postcode";
import { CreatePost } from "../../api/Post/Post";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AllDog, DogDetailapi, UpdatePost } from "../../api/MyPage/MyDog";

export default function AddJob({ navigation, route }) {
  const { selectedDogs, refresh = false } = route.params || {
    selectedDogs: [],
    refresh: false,
  };

  // 강아지 선택
  const [dogs, setDogs] = useState([]);

  useEffect(() => {
    fetchDogs();
  }, []);

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

  // 선택해서 가져온 강아지 정보
  const [dogDetails, setDogDetails] = useState([]);

  // 게시글 작성
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [payment, setPayment] = useState();
  const [address, setAddress] = useState("");
  const [dogIds, setDogIds] = useState([]);
  const [isAddressModalVisible, setIsAddressModalVisible] = useState(false);

  const handlePost = async () => {
    try {
      const response = await CreatePost({
        title,
        content,
        payment,
        address,
        dogIds,
      });
      if (response && response.status === 200) {
        // 성공적으로 게시글이 등록된 경우

        console.log("게시글 등록 성공:", response.data);
        navigation.navigate("WalkStatus", {
          screen: "JobPost",
          params: {
            refresh: true,
          },
        });
      } else {
        console.error("게시글 등록 실패:", response);
      }
    } catch (error) {
      console.error("게시글 등록 중 오류 발생:", error);
    }
  };

  const getAddressData = (data) => {
    // console.log(data);

    // 기본주소 설정, 지번 주소가 비어있지 않다면 지번 주소를 사용하고, 그렇지 않다면 자동 지번 주소를 사용
    const fullAddress =
      data.jibunAddress !== "" ? data.jibunAddress : data.autoJibunAddress;

    // 상세 주소를 추출
    const detailedAddress =
      fullAddress.split(" ")[2] + " " + fullAddress.split(" ")[3];

    console.log(detailedAddress);
    setAddress(detailedAddress);
    setIsAddressModalVisible(false);
  };

  // 강아지 ID 받아와서 저장
  useEffect(() => {
    if (refresh) {
      setDogIds(selectedDogs);
      fetchDogDetails(selectedDogs);
    }
  }, [refresh, selectedDogs]);

  // 받아온 강아지 ID를 통해서 정보 가져오기
  const fetchDogDetails = async (dogIds) => {
    const newDogDetails = await Promise.all(
      dogIds.map(async (id) => {
        const response = await DogDetailapi({ dogId: id });
        return {
          dogId: response.data.dogId,
          dogName: response.data.dogName,
        };
      })
    );
    setDogDetails(newDogDetails); // 이전 dogDetails 대신 새로운 강아지 정보만 반영
  };

  // console.log(dogDetails);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        {/* <View style={styles.imageContainer}>
          <TouchableOpacity onPress={pickImage} style={styles.pickImage}>
            <Text style={styles.pickImageText}>+</Text>
          </TouchableOpacity>
          {image ? (
            <Image source={{ uri: image }} style={styles.imagePreview} />
          ) : (
            <View style={styles.imagePreviewPlaceholder} />
          )}
        </View> */}

        <TextInput
          style={styles.input}
          placeholder="제목"
          value={title}
          onChangeText={setTitle}
          returnKeyType="next"
        />
        <Text> 산책할 강아지 선택하기 </Text>
        <TouchableOpacity
          style={[styles.input, { flexDirection: "row", gap: 10 }]}
          onPress={() => {
            setDogIds([]); // dogIds 초기화
            setDogDetails([]); // dogDetails 초기화
            navigation.navigate("강아지 선택", {
              dogs: dogs,
              refresh: false,
            });
          }}
        >
          {dogDetails.map((dog) => (
            <TouchableOpacity key={dog.dogId}>
              <Text>{dog.dogName}</Text>
            </TouchableOpacity>
          ))}
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          placeholder="가격"
          value={payment}
          onChangeText={setPayment}
          keyboardType="numeric"
          returnKeyType="next"
        />
        <TouchableOpacity
          onPress={() => setIsAddressModalVisible(true)}
          style={styles.input}
        >
          <Text style={{ color: address ? "black" : "grey" }}>
            {address ? address : "동네선택"}
          </Text>
        </TouchableOpacity>
        {
          <Modal
            visible={isAddressModalVisible}
            animationType="slide"
            transparent={false}
            onRequestClose={() => {
              setIsAddressModalVisible(!isAddressModalVisible);
            }}
          >
            <Postcode
              style={{ flex: 1, width: "100%", zIndex: 5 }}
              jsOptions={{ animation: true }}
              onSelected={(data) => getAddressData(data)}
              onError={(error) => {
                console.error(error);
                setIsAddressModalVisible(false);
              }}
            />
            <View style={styles.modalContainer}>
              <TouchableOpacity
                onPress={() => setIsAddressModalVisible(false)}
                style={styles.closeButton}
              >
                <Text style={styles.closeButtonText}>뒤로</Text>
              </TouchableOpacity>

              {/* 여기에 모달 내용을 추가하세요 */}
            </View>
          </Modal>
        }
        <TextInput
          placeholder="신뢰할 수 있는 거래를 위해 자세히 적어주세요."
          style={styles.input2}
          value={content}
          onChangeText={setContent}
          multiline={true}
          returnKeyType="next"
          onSubmitEditing={Keyboard.dismiss}
        />

        <TouchableOpacity style={styles.button} onPress={handlePost}>
          <Text style={styles.buttonText}>게시글 작성</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f9f9f9",
  },

  input: {
    height: 50,
    margin: 12,
    borderWidth: 1,
    borderColor: "#e1e1e1",
    padding: 10,
    width: "95%",
    borderRadius: 10,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  input2: {
    height: 100,
    margin: 12,
    borderWidth: 1,
    borderColor: "#e1e1e1",
    padding: 10,
    width: "95%",
    borderRadius: 10,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  button: {
    backgroundColor: "skyblue",
    padding: 20,
    borderRadius: 15,
    marginTop: 20,
    width: "80%",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  imageButton: {
    backgroundColor: "skyblue",
    padding: 10,
    borderRadius: 25,
    marginTop: 20,
    width: "100%",
    alignItems: "center",
  },
  imageButtonText: {
    color: "white",
    fontSize: 16,
  },
  imageContainer: {
    width: "95%",
    height: "28%",
    marginTop: -20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    position: "relative", // 위치를 상대적으로 설정
  },
  imagePreview: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
    resizeMode: "cover",
  },
  imagePreviewPlaceholder: {
    width: "100%",
    height: "100%",
    backgroundColor: "#e1e1e1",
  },

  pickImage: {
    backgroundColor: "skyblue",
    height: 50,
    width: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: "70%",
    right: "2%",
    zIndex: 1,
  },
  pickImageText: {
    color: "white",
    fontSize: 40,
    lineHeight: 50,
    textAlign: "center",
  },

  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    padding: 10,
    backgroundColor: "skyblue",
    borderRadius: 5,
  },
  closeButtonText: {
    color: "white",
    fontSize: 16,
  },
});

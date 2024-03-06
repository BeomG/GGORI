import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  Button,
  TouchableOpacity,
  Image,
} from "react-native";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import * as ImagePicker from "expo-image-picker";
import { RegisterDog } from "../../api/MyPage/MyDog";
import * as ImageManipulator from "expo-image-manipulator";

function Register({ navigation, route }) {
  const [photo, setPhoto] = useState(null);
  const [name, setName] = useState(""); // 이름
  const [gender, setGender] = useState(null); // 성별
  const [isNeutralized, setIsNeutralized] = useState(null); // 중성화 여부
  const [breed, setBreed] = useState(""); // 견종
  const [birthYear, setBirthYear] = useState(""); // 생년
  const [birthMonth, setBirthMonth] = useState(""); // 생월
  const [birthDay, setBirthDay] = useState(""); // 생일
  const [weight, setWeight] = useState(""); // 무게

  const pickImage = async () => {
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
      setPhoto({
        uri: resizedImage.uri,
        blob,
      });
    }
  };

  const handleComplete = async () => {
    const formattedMonth =
      birthMonth.length === 1 ? "0" + birthMonth : birthMonth;
    const formattedDay = birthDay.length === 1 ? "0" + birthDay : birthDay;

    const genderToSend = gender ? "MALE" : "FEMALE";

    const res = await RegisterDog({
      dogName: name,
      dogBirthDay: `${birthYear}-${formattedMonth}-${formattedDay}`,
      gender: genderToSend,
      dogBreed: breed,
      dogWeight: weight,
      dogNeuter: isNeutralized,
      dogImage: photo,
    });

    if (res) {
      if (route.params.refresh) {
        route.params.refresh(); // 강아지 등록 후 refresh 함수를 호출하여 DogList를 갱신
      }
      navigation.navigate("나의 강아지");
    } else {
      console.log("Failed to register dog.");
    }
  };

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <TouchableOpacity style={styles.img} onPress={pickImage}>
        {photo && (
          <Image
            source={{ uri: photo.uri }}
            style={{ width: "100%", height: "100%" }}
          />
        )}
      </TouchableOpacity>
      <ScrollView style={styles.contentbox}>
        <View style={styles.container}>
          <View style={styles.inputbox}>
            <Text style={styles.title}> 이름 </Text>
            <TextInput
              style={styles.inpt}
              placeholder="이름을 입력해 주세요"
              value={name}
              onChangeText={setName}
            />
          </View>
          <View style={styles.inputbox}>
            <Text style={styles.title}> 성별 </Text>
            <View style={styles.Button_Box}>
              <TouchableOpacity
                style={[styles.btn1, gender ? styles.activeBtn1 : null]} // 선택된 경우 activeBtn 스타일 적용
                onPress={() => setGender(true)} // 남자 버튼 클릭 시 상태 변경
              >
                <Text
                  style={[styles.btnTxt, gender ? styles.activeBtnTxt : null]}
                >
                  남자
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.btn1, !gender ? styles.activeBtn1 : null]} // 선택된 경우 activeBtn 스타일 적용
                onPress={() => setGender(false)} // 여자 버튼 클릭 시 상태 변경
              >
                <Text
                  style={[styles.btnTxt, !gender ? styles.activeBtnTxt : null]}
                >
                  여자
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.inputbox}>
            <Text style={styles.title}> 중성화 </Text>
            <View style={styles.Button_Box}>
              <TouchableOpacity
                style={[styles.btn2, isNeutralized ? styles.activeBtn2 : null]} // 선택된 경우 activeBtn 스타일 적용
                onPress={() => setIsNeutralized(true)} // 했어요 버튼 클릭 시 상태 변경
              >
                <Text
                  style={[
                    styles.btnTxt,
                    isNeutralized ? styles.activeBtnTxt : null,
                  ]}
                >
                  했어요
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.btn2, !isNeutralized ? styles.activeBtn2 : null]} // 선택된 경우 activeBtn 스타일 적용
                onPress={() => setIsNeutralized(false)} // 했어요 버튼 클릭 시 상태 변경
              >
                <Text
                  style={[
                    styles.btnTxt,
                    !isNeutralized ? styles.activeBtnTxt : null,
                  ]}
                >
                  안했어요
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.inputbox}>
            <Text style={styles.title}> 견종 </Text>
            <TextInput
              style={styles.inpt}
              placeholder="견종을 입력해 주세요"
              value={breed}
              onChangeText={setBreed}
            />
          </View>
          <View style={styles.inputbox}>
            <Text style={styles.title}> 생일 </Text>
            <View style={styles.Button_Box}>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                <TextInput
                  style={[styles.inpt_num, { flex: 1 }]}
                  placeholder="0000"
                  keyboardType="numeric"
                  value={birthYear}
                  onChangeText={setBirthYear}
                  maxLength={4}
                />
                <Text style={{ fontSize: 20 }}>년</Text>
              </View>
              <View
                style={{
                  flex: 0.5,
                  flexDirection: "row",
                  right: 5,
                  justifyContent: "center",
                }}
              >
                <TextInput
                  style={[styles.inpt_num, { flex: 4 }]}
                  placeholder="00"
                  keyboardType="numeric"
                  value={birthMonth}
                  onChangeText={setBirthMonth}
                  maxLength={2}
                />
                <Text style={{ fontSize: 20 }}>월</Text>
              </View>
              <View
                style={{
                  flex: 0.5,
                  flexDirection: "row",
                  right: 10,
                  justifyContent: "center",
                }}
              >
                <TextInput
                  style={[styles.inpt_num, { flex: 4 }]}
                  placeholder="00"
                  keyboardType="numeric"
                  value={birthDay}
                  onChangeText={setBirthDay}
                  maxLength={2}
                />
                <Text style={{ fontSize: 20 }}>일</Text>
              </View>
            </View>
          </View>
          <View style={styles.inputbox}>
            <Text style={styles.title}> 무게 </Text>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                right: 40,
                justifyContent: "center",
              }}
            >
              <TextInput
                style={[styles.inpt_num, { flex: 1 }]} // flex 값을 조정하여 입력란과 단위 사이의 공간을 확보합니다.
                placeholder=""
                keyboardType="numeric"
                value={weight}
                onChangeText={setWeight}
                maxLength={3}
              />
              <Text style={{ fontSize: 20 }}>kg</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.complete} onPress={handleComplete}>
            <Text style={styles.txt}>완료</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  img: {
    flex: 0.5,
    backgroundColor: "skyblue",
    justifyContent: "center",
    alignItems: "center",
  },
  contentbox: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: "white",
    width: "100%",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  inputbox: {
    flexDirection: "row",
    flex: 1,
    marginBottom: 25,
  },
  title: {
    fontSize: 21,
    fontWeight: "900",
    marginLeft: 30,
    flex: 3,
  },
  inpt: {
    fontSize: 20,
    flex: 3,
    borderBottomWidth: 1,
    borderBottomColor: "grey",
    textAlign: "center",
    right: 20,
  },
  inpt_num: {
    fontSize: 20,
    borderBottomWidth: 1,
    borderBottomColor: "grey",
    textAlign: "center",
  },
  Button_Box: {
    flexDirection: "row",
    gap: 10,
    flex: 4,
    justifyContent: "center",
  },
  btn1: {
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 15,
    backgroundColor: "white",
    elevation: 2, // 그림자 추가 (Android)
    shadowColor: "#000", // 그림자 추가 (iOS)
    shadowOpacity: 0.3, // 그림자 추가 (iOS)
    shadowOffset: { width: -1, height: -1 }, // 그림자 추가 (iOS)
    shadowRadius: 2, // 그림자 추가 (iOS)
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    height: 38,
  },
  activeBtn1: {
    backgroundColor: "#58A9D7",
    justifyContent: "center",
    alignItems: "center",
  },
  btn2: {
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 15,
    backgroundColor: "white",
    elevation: 2, // 그림자 추가 (Android)
    shadowColor: "#000", // 그림자 추가 (iOS)
    shadowOpacity: 0.3, // 그림자 추가 (iOS)
    shadowOffset: { width: -1, height: -1 }, // 그림자 추가 (iOS)
    shadowRadius: 2, // 그림자 추가 (iOS)
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    height: 38,
  },
  activeBtn2: {
    backgroundColor: "#58A9D7",
    justifyContent: "center",
    alignItems: "center",
  },
  btnTxt: {
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
    color: "grey",
  },
  activeBtnTxt: {
    color: "white",
  },
  complete: {
    width: 300,
    height: 40,
    backgroundColor: "#58A9D7",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
  txt: {
    fontWeight: "bold",
    color: "white",
    fontSize: 20,
  },
});

export default Register;

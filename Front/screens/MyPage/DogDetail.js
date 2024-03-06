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
import { UpdateDog, DogDetailapi, DeleteDog } from "../../api/MyPage/MyDog";
import { LogBox } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";

LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state",
]);

function DogDetail({ route, navigation }) {
  // route.params.dogId를 이용하여 dogId를 가져옵니다.
  const { dogId } = route.params;

  useEffect(() => {
    const fetchDogDetail = async () => {
      try {
        const response = await DogDetailapi({ dogId });
        if (response && response.data) {
          const dog = response.data;
          if (response) {
            // API 호출 결과를 이용하여 상태를 설정합니다.
            setPhoto({ uri: dog.imageUrl });
            setName(dog.dogName);
            setGender(dog.gender === "Male");
            setIsNeutralized(dog.dogNeuter);
            setBreed(dog.dogBreed);
            setWeight(dog.dogWeight);

            // 생년월일은 YYYY-MM-DD 형식이므로 '-'를 기준으로 나눕니다.
            const [year, month, day] = dog.dogBirthDay.split("-");
            setBirthYear(year);
            setBirthMonth(month);
            setBirthDay(day);
          }
        } else {
          console.error("Failed to fetch dog detail: No response data");
        }
      } catch (error) {
        console.error("Error fetching dog detail:", error);
      }
    };
    fetchDogDetail();
  }, []);

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

  const handleUpdate = async () => {
    const formattedMonth =
      birthMonth.length === 1 ? "0" + birthMonth : birthMonth;
    const formattedDay = birthDay.length === 1 ? "0" + birthDay : birthDay;

    const genderToSend = gender ? "MALE" : "FEMALE";

    const res = await UpdateDog({
      dogId: dogId,
      dogName: name,
      dogBirthDay: `${birthYear}-${formattedMonth}-${formattedDay}`,
      gender: genderToSend,
      dogBreed: breed,
      dogWeight: parseInt(weight),
      dogNeuter: isNeutralized,
      dogImages: photo,
    });

    if (res) {
      if (route.params.refresh) {
        route.params.refresh(); // 강아지 정보 수정 후 refresh 함수를 호출하여 DogList를 갱신
      }
      navigation.navigate("나의 강아지");
    } else {
      console.log("Failed to Modify dog. UpdateDog returned:", res);
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
                style={[styles.inpt_num, { flex: 1 }]}
                placeholder=""
                keyboardType="numeric"
                value={weight.toString()}
                onChangeText={setWeight}
                maxLength={3}
              />
              <Text style={{ fontSize: 20 }}>kg</Text>
            </View>
          </View>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity style={styles.complete} onPress={handleUpdate}>
              <Text style={styles.txt}>수정</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.complete, { backgroundColor: "red" }]}
              onPress={async () => {
                const result = await DeleteDog({ dogId: dogId });
                // 삭제 성공시 행동
                if (result) {
                  if (route.params.refresh) {
                    route.params.refresh(); // 강아지 정보 삭제 후 refresh 함수를 호출하여 DogList를 갱신
                  }
                  navigation.navigate("나의 강아지");
                } else {
                  console.log("Delete failed");
                }
              }}
            >
              <Text style={styles.txt}>삭제</Text>
            </TouchableOpacity>
          </View>
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
    height: 40,
    backgroundColor: "#58A9D7",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    flex: 1,
    margin: 5,
  },
  txt: {
    fontWeight: "bold",
    color: "white",
    fontSize: 20,
  },
});

export default DogDetail;

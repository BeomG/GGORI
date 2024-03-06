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


LogBox.ignoreLogs([
    "Non-serializable values were found in the navigation state",
]);

function LostDogDetail({ route, navigation }) {
    // route.params.dogId를 이용하여 dogId를 가져옵니다.
    const { dogId } = route.params;

    const [photo, setPhoto] = useState(null);
    const [name, setName] = useState(""); // 이름
    const [gender, setGender] = useState(null); // 성별
    const [isNeutralized, setIsNeutralized] = useState(null); // 중성화 여부
    const [breed, setBreed] = useState(""); // 견종
    const [birthYear, setBirthYear] = useState(""); // 생년
    const [birthMonth, setBirthMonth] = useState(""); // 생월
    const [birthDay, setBirthDay] = useState(""); // 생일
    const [weight, setWeight] = useState(""); // 무게

    useEffect(() => {
        // API 호출 함수
        const fetchDogDetail = async () => {
            try {
                const response = await DogDetailapi({ dogId });
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
            } catch (error) {
                console.error("Error fetching dog detail:", error);
            }
        };

        // useEffect 내에서 비동기 함수를 호출합니다.
        fetchDogDetail();
    }, []); // 빈 의존성 배열을 제공하여 컴포넌트 마운트 시 한 번만 API를 호출하게 합니다.

    // const [photo, setPhoto] = useState(null);
    // const [name, setName] = useState(""); // 이름
    // const [gender, setGender] = useState(null); // 성별
    // const [isNeutralized, setIsNeutralized] = useState(null); // 중성화 여부
    // const [breed, setBreed] = useState(""); // 견종
    // const [birthYear, setBirthYear] = useState(""); // 생년
    // const [birthMonth, setBirthMonth] = useState(""); // 생월
    // const [birthDay, setBirthDay] = useState(""); // 생일
    // const [weight, setWeight] = useState(""); // 무게

    return (
        <View
            style={{
                flex: 1,
            }}
        >
            <View style={styles.img}>
                {photo && (
                    <Image
                        source={{ uri: photo.uri }}
                        style={{ width: "100%", height: "100%" }}
                    />
                )}
            </View>
            <ScrollView style={styles.contentbox}>
                <View style={styles.container}>
                    <View style={styles.inputbox}>
                        <Text style={styles.title}> 이름 </Text>
                        <Text style={styles.inpt}>{name}</Text>
                    </View>
                    <View style={styles.inputbox}>
                        <Text style={styles.title}> 성별 </Text>
                        <View style={styles.Button_Box}>
                            <View
                                style={[styles.btn1, gender ? styles.activeBtn1 : null]} // 선택된 경우 activeBtn 스타일 적용

                            >
                                <Text
                                    style={[styles.btnTxt, gender ? styles.activeBtnTxt : null]}
                                >
                                    남자
                                </Text>
                            </View>
                            <View
                                style={[styles.btn1, !gender ? styles.activeBtn1 : null]} // 선택된 경우 activeBtn 스타일 적용

                            >
                                <Text
                                    style={[styles.btnTxt, !gender ? styles.activeBtnTxt : null]}
                                >
                                    여자
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.inputbox}>
                        <Text style={styles.title}> 중성화 </Text>
                        <View style={styles.Button_Box}>
                            <View
                                style={[styles.btn2, isNeutralized ? styles.activeBtn2 : null]} // 선택된 경우 activeBtn 스타일 적용

                            >
                                <Text
                                    style={[
                                        styles.btnTxt,
                                        isNeutralized ? styles.activeBtnTxt : null,
                                    ]}
                                >
                                    했어요
                                </Text>
                            </View>

                            <View
                                style={[styles.btn2, !isNeutralized ? styles.activeBtn2 : null]} // 선택된 경우 activeBtn 스타일 적용

                            >
                                <Text
                                    style={[
                                        styles.btnTxt,
                                        !isNeutralized ? styles.activeBtnTxt : null,
                                    ]}
                                >
                                    안했어요
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.inputbox}>
                        <Text style={styles.title}> 견종 </Text>
                        <Text style={styles.inpt}>{breed}</Text>
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
                                <Text style={[styles.inpt_num, { flex: 1 }]}>{birthYear}</Text>
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
                                <Text style={[styles.inpt_num, { flex: 4 }]}>{birthMonth}</Text>
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
                                <Text style={[styles.inpt_num, { flex: 4 }]}>{birthDay}</Text>
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
                            <Text style={[styles.inpt_num, { flex: 1 }]}>{weight.toString()}</Text>
                            <Text style={{ fontSize: 20 }}>kg</Text>
                        </View>
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

export default LostDogDetail;

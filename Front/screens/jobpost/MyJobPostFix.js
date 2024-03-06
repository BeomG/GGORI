import React, { useState, useEffect, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import Postcode from "@actbase/react-daum-postcode";
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    TouchableOpacity,

    Button,
    Image,

    Platform,
    TextInput,

    TouchableWithoutFeedback,
    Keyboard,
    Modal,
} from "react-native";
import JobDetail from "./JobDetail";
import AddJob from "./AddJob";
import { AllPost } from "../../api/Post/Post";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { AllDog, DogDetailapi, UpdatePost } from "../../api/MyPage/MyDog";


export default function MyJobPostFix({ route, navigation }) {
    const { jobDetail } = route.params;

    // 게시글 수정에 필요한 상태
    const [title, setTitle] = useState(jobDetail.title);
    const [content, setContent] = useState(jobDetail.content);
    const [payment, setPayment] = useState(jobDetail.payment.toString());
    const [address, setAddress] = useState("");
    const [isAddressModalVisible, setIsAddressModalVisible] = useState(false);
    console.log(jobDetail)

    // 강아지 관련 상태
    const [dogs, setDogs] = useState([]);
    const [dogDetails, setDogDetails] = useState([]);

    // 강아지 목록을 가져오는 함수
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

    useEffect(() => {
        fetchDogs();
    }, []);

    // 게시물 수정 함수
    const handleUpdate = async () => {
        try {
            const token = await AsyncStorage.getItem('refreshToken');
            const response = await UpdatePost(jobDetail.jobBoardId, {
                title,
                content,
                payment,
                address,
                // 여기에 추가적인 필요한 데이터를 넣습니다.
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response && response.status === 200) {
                console.log("게시글 수정 성공:", response.data);
                navigation.navigate("MyJobPost");
            } else {
                console.error("게시글 수정 실패:", response);
            }
        } catch (error) {
            console.error("게시글 수정 중 오류 발생:", error);
        }
    };

    // 나머지 UI 및 로직은 `AddJob` 컴포넌트와 유사하게 구성할 수 있습니다.

    return (
        <View style={styles.container}>
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
                    <TouchableOpacity style={styles.button} onPress={handleUpdate}>
                        <Text style={styles.buttonText}>게시글 수정</Text>
                    </TouchableOpacity>

                </View>
            </TouchableWithoutFeedback>
        </View>
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

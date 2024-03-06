import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NotLost } from "../../api/LostDog/LostDog";
import { ScrollView } from "react-native-gesture-handler";

function LostDogAdd({ navigation, refresh }) {
    const [dogs, setDogs] = useState([]);

    useEffect(() => {
        fetchLostDogs();
    }, []);

    const fetchLostDogs = async () => {
        try {
            const token = await AsyncStorage.getItem('refreshToken');
            const response = await fetch(`https://kkori.kr/api/dog/all-not-lostdog/by-member`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const responseData = await response.json();
                setDogs(responseData);
            } else {
                throw new Error('Failed to fetch lost dogs');
            }
        } catch (error) {
            console.error("Error fetching lost dogs:", error);
        }
    };

    const registerLostDog = async (dogId) => {
        try {
            const token = await AsyncStorage.getItem('refreshToken');
            const response = await fetch(`https://kkori.kr/api/dog/register-lost/${dogId}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to register lost dog');
            }

            Alert.alert("등록 완료", "분실견으로 등록되었습니다.", [
                { text: "확인", onPress: () => navigation.navigate('LostDog') } // 여기에서 LostDog로 이동
            ]);
        } catch (error) {
            console.error("Error registering lost dog:", error);
        }
    };

    const handleDogClick = (dogId) => {
        Alert.alert(
            "분실견 등록",
            "해당 강아지를 분실견으로 등록하시겠습니까?",
            [
                {
                    text: "취소",
                    style: "cancel"
                },
                {
                    text: "확인",
                    onPress: () => registerLostDog(dogId)
                }
            ]
        );
    };

    return (
        <ScrollView style={{ flex: 1 }}>
            <View style={styles.container}>
                {dogs.length > 0 ? (
                    dogs.map((dog) => (
                        <TouchableOpacity
                            key={dog.dogId}
                            style={styles.dogContainer}
                            onPress={() => handleDogClick(dog.dogId)}
                        >
                            <View style={styles.dog}>
                                <Image style={styles.dogImg} source={{ uri: dog.imageUrl }} />
                                <View style={styles.dogContent}>
                                    <View style={[styles.content, { alignItems: "flex-end" }]}>
                                        <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                                            {dog.dogName}
                                        </Text>
                                        <Text style={{ fontSize: 14 }}>{dog.dogAge}세</Text>
                                    </View>
                                    <View style={[styles.content, { alignItems: "center" }]}>
                                        <Image
                                            style={{ width: "9%", height: 15, marginTop: 4 }}
                                            source={require("../../assets/mypage/gender.png")}
                                        />
                                        <Text style={{ fontSize: 14, fontWeight: "bold" }}>
                                            {dog.gender === "Male" ? "남" : "여"}
                                        </Text>
                                    </View>
                                    <View style={[styles.content, { alignItems: "center" }]}>
                                        <Image
                                            style={{ width: "10%", height: 15, marginTop: 4 }}
                                            source={require("../../assets/mypage/emdog.png")}
                                        />
                                        <Text style={{ fontSize: 14, fontWeight: "bold" }}>
                                            {dog.dogBreed}
                                        </Text>
                                    </View>
                                </View>
                                <Image
                                    style={styles.arrow}
                                    source={require("../../assets/mypage/Arrowl.png")}
                                />
                            </View>
                        </TouchableOpacity>
                    ))
                ) : (
                    <View style={styles.noDogsContainer}>
                        <Text style={styles.noDogsText}>등록할 분실견이 없습니다</Text>
                    </View>
                )}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        width: "100%",
    },
    dogContainer: {
        width: "90%",
        height: 120,
        flexDirection: "row",
        backgroundColor: "white",
        borderBlockColor: "black",
        borderRadius: 10,
        elevation: 3, // 그림자 추가 (Android)
        shadowColor: "#000", // 그림자 추가 (iOS)
        shadowOpacity: 0.3, // 그림자 추가 (iOS)
        shadowOffset: { width: -1, height: -1 }, // 그림자 추가 (iOS)
        shadowRadius: 2, // 그림자 추가 (iOS)
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
        marginBottom: 5,
        marginLeft: "5%",
        padding: 5,
    },
    dog: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
        gap: 10,
    },
    dogImg: {
        flex: 2,
        height: 110,
        borderRadius: 10,
    },
    dogContent: {
        flex: 3,
        gap: 13,
    },
    content: {
        flexDirection: "row",
        gap: 10,
    },
    arrow: {
        width: "7%",
        height: 30,
    },
    noDogsContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    noDogsText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#666',
    },
});

export default LostDogAdd;


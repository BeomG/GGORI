import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AllDog } from "../../api/MyPage/MyDog";
import { ScrollView } from "react-native-gesture-handler";

function MyLostDog({ navigation, refresh }) {
    const [dogs, setDogs] = useState([]);

    useEffect(() => {
        fetchLostDogs();
    }, []);

    const fetchLostDogs = async () => {
        try {
            const token = await AsyncStorage.getItem('refreshToken');
            const response = await fetch(`https://kkori.kr/api/dog/all-lostdog/by-member`, {
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

    const deleteDog = async (dogId) => {
        try {
            const token = await AsyncStorage.getItem('refreshToken');
            const response = await fetch(`https://kkori.kr/api/dog/delete/${dogId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.ok) {
                Alert.alert("삭제 완료", "강아지 정보가 삭제되었습니다.");
                fetchLostDogs(); // Refresh the list after deletion
            } else {
                throw new Error('Failed to delete dog');
            }
        } catch (error) {
            console.error("Error deleting dog:", error);
        }
    };


    return (
        <ScrollView style={{ flex: 1 }}>

            <View style={styles.container}>
                <Text style={styles.topMessage}>
                    분실견 삭제 후 강아지를 재등록 해주세요.
                </Text>
                {dogs.map((dog) => (
                    <View key={dog.dogId} style={styles.dogContainer}>
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
                        </View>
                        <TouchableOpacity onPress={() => deleteDog(dog.dogId)} style={styles.deleteButton}>
                            <Text style={styles.deleteButtonText}>삭제</Text>
                        </TouchableOpacity>
                    </View>
                ))}
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
    deleteButton: {
        width: 40,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ff4444', // Red color for delete button
        borderRadius: 5,
    },
    deleteButtonText: {
        color: 'white',
        fontSize: 13,
    },
    topMessage: {
        textAlign: 'center',
        fontSize: 16,
        color: '#333',
        marginVertical: 10,
    },
});

export default MyLostDog;


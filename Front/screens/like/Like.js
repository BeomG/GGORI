import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import * as Font from 'expo-font';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";


function Like({ navigation }) {
    const [likedPosts, setLikedPosts] = useState([]);
    const fetchLikedPosts = async () => {
        try {
            const token = await AsyncStorage.getItem('refreshToken');
            const response = await axios.get('https://kkori.kr/api/job-board/like/all', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setLikedPosts(response.data); // 서버로부터 받은 데이터로 상태 업데이트

            // console.log(response.data[0].dogs[0].imageUrl)

        } catch (error) {
            console.error('좋아요한 게시물 목록 가져오기 실패:', error);
        }
    };

    useEffect(() => {
        fetchLikedPosts();
    }, []);

    const performDelete = async (jobBoardId) => {
        try {
            const token = await AsyncStorage.getItem('refreshToken');
            await axios.delete(`https://kkori.kr/api/job-board/like/delete-like/${jobBoardId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setLikedPosts(likedPosts.filter(post => post.jobBoardId !== jobBoardId));
        } catch (error) {
            console.error('좋아요 삭제 실패:', error);
        }
    };

    const deleteLike = async (jobBoardId) => {
        // 사용자에게 확인 메시지를 표시
        Alert.alert(
            "삭제 확인",
            "찜한 게시글을 삭제하시겠습니까?",
            [
                // '취소' 버튼
                {
                    text: "취소",
                    onPress: () => console.log("삭제 취소"),
                    style: "cancel"
                },
                // '확인' 버튼
                {
                    text: "확인",
                    onPress: () => performDelete(jobBoardId)
                }
            ],
            { cancelable: false }
        );
    };

    const renderItem = ({ item }) => {
        const imageUrl = item.dogs[0].imageUrl
        return (
            <View style={styles.card}>
                <TouchableOpacity
                    style={styles.cardContent}
                    onPress={() => navigation.navigate("JobDetail", { jobDetail: item })}
                >
                    <Image source={{ uri: imageUrl }} style={styles.image} />
                    <View style={styles.textContainer}>
                        <Text style={styles.title}>{item.title}</Text>
                        <Text style={styles.description}>
                            {item.locationResponse.city} {item.locationResponse.dong}
                        </Text>
                        <Text style={styles.price}>{item.payment}원</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.deleteButton} onPress={() => deleteLike(item.jobBoardId)}>
                    <Text style={styles.deleteButtonText}>삭제</Text>
                </TouchableOpacity>
            </View>
        );
    };



    return (
        <View style={styles.container}>
            <FlatList
                data={likedPosts}
                renderItem={renderItem}
                keyExtractor={(item) => item.jobBoardId.toString()}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 8,
    },
    card: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "white",
        marginBottom: 12,
        padding: 10,
        borderRadius: 4,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },
    cardContent: {
        flexDirection: "row",
        alignItems: "center",
    },
    image: {
        width: 110,
        height: 110,
        borderRadius: 4,
        marginRight: 18,
    },
    textContainer: {
        flex: 1,
        justifyContent: "center",
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 4,
    },
    description: {
        fontSize: 14,
        color: "gray",
        marginBottom: 4,
    },
    price: {
        fontSize: 12,
        fontWeight: "bold",
        color: "skyblue",
    },
    deleteButton: {
        padding: 10,
        right: 50,
        backgroundColor: "red",
        borderRadius: 4,
    },
    deleteButtonText: {
        color: "white",
    },

});

export default Like;

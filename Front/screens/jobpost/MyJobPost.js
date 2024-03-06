import React, { useState, useEffect, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    Image,
    Button,
} from "react-native";
import JobDetail from "./JobDetail";
import AddJob from "./AddJob";
import { AllPost } from "../../api/Post/Post";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";


export default function MyJobPost({ navigation }) {
    const [myPosts, setMyPosts] = useState([]);

    useEffect(() => {
        const fetchMyPosts = async () => {
            try {
                const token = await AsyncStorage.getItem('refreshToken');
                const response = await axios.get('https://kkori.kr/api/post/all/by-member', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setMyPosts(response.data); // 가정: 응답 데이터가 게시글 배열
                console.log(response.data)
            } catch (error) {
                console.error('내 게시글 불러오기 실패:', error);
            }
        };

        fetchMyPosts();
    }, []);

    const fixPost = (item) => {
        navigation.navigate("MyJobPostFix", {
            jobDetail: item,
        });
    };

    const deletePost = async (jobBoardId) => {
        try {
            const token = await AsyncStorage.getItem('refreshToken');
            await axios.delete(`https://kkori.kr/api/post/delete/${jobBoardId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            // 삭제 후 게시물 목록 갱신
            setMyPosts(prevPosts => prevPosts.filter(post => post.jobBoardId !== jobBoardId));
        } catch (error) {
            console.error('게시글 삭제 실패:', error);
        }
    };

    const renderItem = ({ item }) => {
        const imageUrl = item.dogs && item.dogs.length > 0 ? item.dogs[0].imageUrl : null;
        const displayTitle = item.title.length > 12 ? `${item.title.slice(0, 12)}...` : item.title;
        return (
            <View style={styles.cardWrapper}>
                <TouchableOpacity
                    style={styles.card}
                    onPress={() =>
                        navigation.navigate("JobDetail", {
                            jobDetail: item,
                        })
                    }

                >

                    {/* <Image source={{ uri: images[0].image }} style={styles.image} /> */}
                    <Image source={{ uri: imageUrl }} style={styles.image} />
                    <View style={styles.textContainer}>
                        <Text style={styles.title}>{displayTitle}</Text>
                        <Text style={styles.description}>
                            {item.locationResponse.city} {item.locationResponse.dong}
                        </Text>
                        <Text style={styles.price}>{item.payment}원</Text>
                    </View>
                </TouchableOpacity>
                <View style={styles.buttonGroup}>
                    <TouchableOpacity
                        style={styles.editButton}
                        onPress={() => fixPost(item)}
                    >
                        <Text style={styles.editButtonText}>수정</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.deleteButton}
                        onPress={() => deletePost(item.jobBoardId)}
                    >
                        <Text style={styles.deleteButtonText}>삭제</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    };


    return (
        <View style={styles.container}>
            <FlatList
                data={myPosts}
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
        backgroundColor: "white",
        marginBottom: 12,
        padding: 1,
        borderRadius: 4,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },

    image: {
        width: 110,
        height: 110,
        borderRadius: 4,
        marginRight: 18,
        resizeMode: "cover",
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

    addButton: {
        position: "absolute",
        right: 24,
        bottom: 36,
        width: 56,
        height: 56,
        borderRadius: 150,
        backgroundColor: "skyblue",
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },
    addButtonText: {
        fontSize: 40,
        color: "white",
    },
    cardWrapper: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        // 나머지 스타일...
    },
    deleteButton: {
        backgroundColor: "red",
        padding: 8,
        borderRadius: 4,
        right: 50
        // 나머지 스타일...
    },
    deleteButtonText: {
        color: "white",
        // 나머지 스타일...
    },
    buttonGroup: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
        right: 50
    },
    editButton: {
        backgroundColor: "#58A9D7",
        padding: 8,
        borderRadius: 4,
        marginRight: 8, // 버튼 간격
        right: 50
    },
    editButtonText: {
        color: "white",
    },
});

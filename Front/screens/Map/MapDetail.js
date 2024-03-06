import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Keyboard, Modal, FlatList, ImageBackground } from 'react-native';

function MapDetail({ route, navigation }) {

    const { data } = route.params;
    const dataArray = Array.isArray(data) ? data : [data];
    console.log('데이타:',dataArray[0])

    return (
        <View style={styles.container}>
            <ScrollView
            
                style={{ flex: 1, paddingTop: 20 }}
                onStartShouldSetResponderCapture={() => {
                    return false;
                }}>
                {dataArray.map(item => {
                    const itemImageUrl = item.dogs && item.dogs.length > 0 ? item.dogs[0].imageUrl : null;
                    const displayTitle = item.title.length > 12 ? `${item.title.slice(0, 12)}...` : item.title;
                    return (
                        <TouchableOpacity
                            key={item.jobBoardId} // key prop 추가
                            style={styles.card}
                            onPress={() => navigation.navigate('JobDetail', { jobDetail: item })}
                        >
                            <Image source={{ uri: itemImageUrl }} style={styles.image} />
                            <View style={styles.textContainer}>
                                <Text style={styles.title}>{displayTitle}</Text>
                                <Text style={styles.description}>
                                    {item.locationResponse.city} {item.locationResponse.dong}
                                </Text>
                                <Text style={styles.price}>{item.payment}원</Text>
                            </View>
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 8,
    },
    card: {
        flexDirection: 'row',
        backgroundColor: 'white',
        marginBottom: 12,
        padding: 1,
        borderRadius: 4,
        shadowColor: '#000',
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
        resizeMode: 'cover',
    },
    textContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    description: {
        fontSize: 14,
        color: 'gray',
        marginBottom: 4,
    },
    price: {
        fontSize: 12,
        fontWeight: 'bold',
        color: 'skyblue',
    },


    addButton: {
        position: 'absolute',
        right: 24,
        bottom: 36,
        width: 56,
        height: 56,
        borderRadius: 150,
        backgroundColor: 'skyblue',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },
    addButtonText: {
        fontSize: 40,
        color: 'white',
    },
});
export default MapDetail;
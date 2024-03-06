import React, { useState, useEffect, useRef } from 'react';
import { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import MapView from 'react-native-map-clustering';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Keyboard, Modal, FlatList, ImageBackground } from 'react-native';
import * as Location from 'expo-location';
import AsyncStorage from "@react-native-async-storage/async-storage";

// API
import { AllPost } from "../../api/Post/Post";

function Map({ navigation, route }) {

    const checkAuthentication = async () => {
        const token = await AsyncStorage.getItem('refreshToken');
        return !!token;
    };

    const goToAddJob = async () => {
        const isAuthenticated = await checkAuthentication();
        if (isAuthenticated) {
            navigation.navigate("AddJob");
        } else {
            alert('로그인 후 이용해주세요.');
            navigation.navigate('Mainhome', {
                screen: 'MainPage',
                // params: { refresh: true },
            });

        }
    };
    // 지도 게시물 마킹

    const [markers, setMarkers] = useState([]);

    useEffect(() => {
        async function fetchPosts() {
            try {
                const response = await AllPost();
                if (response && response.data) {
                    setMarkers(response.data);
                }
                console.log(response.data)
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        }
        fetchPosts();
    }, []);


    const mapRef = useRef(null);
    // 현 위치
    const [city, setCity] = useState("Loading...");
    const [district, setDistrict] = useState();
    const [street, setStreet] = useState();
    // 위도 경도
    const [latitude, setLatitude] = useState(35.15957832439106);
    const [longitude, setLongitude] = useState(126.8509394432431);
    // 확대
    const [latitudeDelta, setlatitudeDelta] = useState(0.3);
    const [longitudeDelta, setlongitudeDelta] = useState(0.3);
    // 마킹 위도 경도
    const [marklatitude, setmarkLatitude] = useState();
    const [marklongitude, setmarkLongitude] = useState();
    // 모달에 데이터 표시
    const [selectedDongData, setSelectedDongData] = useState([]);
    // 모달
    const [modalVisible, setModalVisible] = useState(false);
    // 모달 상단 동이름
    const [selectedDongName, setSelectedDongName] = useState(null);
    // 모달 닫기
    const handleModalCloseClick = () => {
        setModalVisible(false);
    };


    // 클러스터 클릭시
    const handleClusterPress = (cluster, markersFromCluster) => {
        if (mapRef.current) {
            mapRef.current.getCamera().then(camera => {
                // 현재 카메라 상태(위치, 줌 레벨 등) 유지
                mapRef.current.animateCamera(camera, { duration: 0 });
            });
        }
        const extractedData = markersFromCluster.map(clusteredMarker => {

            // Find the original data based on coordinates
            return markers.find(marker =>
                marker.locationResponse.longitude === clusteredMarker.geometry.coordinates[1] &&
                marker.locationResponse.latitude === clusteredMarker.geometry.coordinates[0]
            );
        }).filter(Boolean); // Remove any undefined values

        setSelectedDongData(extractedData);
        setModalVisible(true);

        // 확대 동작을 제거하려면 아무 코드도 추가하지 마세요.
        navigation.navigate('MapDetail', { data: extractedData });
    };

    const handleMarkerClick = (latitude, longitude) => {
        const markerData = markers.find(marker =>
            marker.locationResponse.latitude === latitude &&
            marker.locationResponse.longitude === longitude
        );
        if (markerData) {
            setSelectedDongData([markerData]);
            // 이 부분에서 선택된 마커에 해당하는 동 이름이나 다른 정보를 설정할 수 있습니다.
            setSelectedDongName(markerData.locationResponse.dong);
            setModalVisible(true);
        }
        navigation.navigate('MapDetail', { data: markerData });
    };

    const [ok, setOk] = useState(true);
    // 위치허용
    const ask = async () => {
        const { granted } = await Location.requestForegroundPermissionsAsync();
        if (!granted) {
            setOk(false);
        }
        const { coords: { latitude, longitude } } = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Lowest });
        const location = await Location.reverseGeocodeAsync(
            { latitude, longitude },
            { useGoogleMaps: false },
        );
        setLatitude(latitude);
        setLongitude(longitude);

        setCity(location[0].city);
        setDistrict(location[0].district);
        setStreet(location[0].street);

        setmarkLatitude(latitude);
        setmarkLongitude(longitude);

        setlatitudeDelta(0.01);
        setlongitudeDelta(0.01)
    };
    useEffect(() => {
        ask();
    }, []);




    return (
        <View style={styles.container}>
            {/* 현위치 */}
            {/* <Text style={{ fontSize: 20, color: 'black', marginTop: 10 }}>실제현위치 : {city} {district} {street}</Text> */}
            <>
                <MapView
                    ref={mapRef}
                    style={styles.map}
                    region={{
                        latitude: latitude,
                        longitude: longitude,
                        latitudeDelta: latitudeDelta,
                        longitudeDelta: longitudeDelta,
                    }}
                    provider={PROVIDER_GOOGLE}
                    onPress={() => Keyboard.dismiss()}
                    clusterColor='#58A9D7'
                    onClusterPress={(cluster, markers) => {
                        handleClusterPress(cluster, markers);
                        return true; // 기본 확대 동작 방지
                    }}
                >
                    {/* 현재위치 마킹 */}
                    <Marker
                        coordinate={{
                            latitude: marklatitude,
                            longitude: marklongitude,
                        }}
                        pinColor="#FF0000"
                        clustering={false}
                    />
                    {markers.map(marker => (
                        <Marker
                            key={marker.jobBoardId}
                            coordinate={{
                                latitude: marker.locationResponse.longitude,
                                longitude: marker.locationResponse.latitude,
                            }}
                            onPress={() => handleMarkerClick(marker.locationResponse.latitude, marker.locationResponse.longitude)}
                        >
                            <View style={styles.customMarker}>
                                <Text style={styles.markerText}>1</Text>
                            </View>
                        </Marker>
                    ))}
                    <GooglePlacesAutocomplete
                        minLength={2}
                        placeholder="장소를 검색해보세요!"
                        keepResultsAfterBlur={false}
                        query={{
                            key: 'AIzaSyAuInS7i261ei_6pAK3Ejh1bdL_eB1MC9k',
                            language: "ko",
                            components: "country:kr",
                        }}
                        keyboardShouldPersistTaps={"handled"}
                        fetchDetails={true}
                        defaultValue=""
                        onPress={(data, details) => {
                            if (details && details.geometry && details.geometry.location) {
                                const { lat, lng } = details.geometry.location;
                                if (lat && lng) {
                                    setLatitude(lat);
                                    setLongitude(lng);
                                    // 선택한 장소에 마커를 표시하도록 마커의 위도와 경도도 업데이트합니다.
                                    setmarkLatitude(lat);
                                    setmarkLongitude(lng);
                                } else {
                                    console.error("위도 또는 경도 정보를 찾을 수 없습니다.");
                                }
                            } else {
                                console.error("geometry 또는 location 정보를 찾을 수 없습니다.");
                            }
                        }}
                        onFail={(error) => console.log(error)}
                        onNotFound={() => console.log("no results")}
                        enablePoweredByContainer={false}
                        styles={styles.search}
                    />
                </MapView>
            </>
            {/* 현위치 버튼 */}
            <TouchableOpacity style={styles.currentLocationButton} onPress={ask}>
                <Image source={require('../../assets/map/현위치.png')} style={styles.lbuttonIcon} />
            </TouchableOpacity>
            {/* 등록 버튼 */}
            <TouchableOpacity style={styles.addjobbutton} onPress={goToAddJob}>
                <Image source={require('../../assets/map/등록.png')} style={styles.abuttonIcon} />
            </TouchableOpacity>
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: '100%',
        height: '100%',
    },
    searchButton: {
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 4,
        padding: 10,
        marginLeft: 10,

    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: 8,
        paddingLeft: 80,
    },
    searchInput: {
        width: '65%',
        height: 40,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        paddingLeft: 10,
        paddingRight: 1,
    },
    currentLocationButton: {
        position: 'absolute',
        right: 10,
        bottom: 35,
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    addjobbutton: {
        position: 'absolute',
        right: 10,
        bottom: 95,
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    lbuttonIcon: {
        width: '120%',
        height: '120%',
    },
    abuttonIcon: {
        width: '120%',
        height: '120%',
    },
    customMarker: {
        width: 35,
        height: 35,
        backgroundColor: '#58A9D7',
        padding: 6,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
    },
    markerText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18
    },
});

export default Map;

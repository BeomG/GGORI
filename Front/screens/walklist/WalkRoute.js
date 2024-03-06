import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PROVIDER_GOOGLE, Marker, Polyline } from 'react-native-maps';
import MapView from 'react-native-map-clustering';
import * as Location from 'expo-location';
import haversine from 'haversine';
import { useNavigation } from '@react-navigation/native';
import { CompleteWalk } from "../../api/Walk/Walk";

import rdb from '../../firebaseConfig';
import { ref, push, onValue, off, serverTimestamp, set, remove } from 'firebase/database';
// import { } from 'react-native';

export default function WalkRoute(props) {
  // console.log('결과 : ', props.jobemail)
  const navigation = useNavigation();
  const [myNickName, setMyNickName] = useState('')
  const [memberID, setMemberID] = useState(0)
  // 시작시간
  const [walkStartTime, setWalkStartTime] = useState(new Date())

  // 위도 경도
  const [startLatitude, setStartLatitude] = useState(0);
  const [startLongitude, setStartLongitude] = useState(0);

  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  // 경로 위도 경도
  // const [marklatitude, setmarkLatitude] = useState([]);
  // const [marklongitude, setmarkLongitude] = useState([]);
  const [markaxis, setMarkaxis] = useState([])
  const [countMark, setCountMark] = useState(false)

  //확대
  const [latitudeDelta, setlatitudeDelta] = useState(0.003);
  const [longitudeDelta, setlongitudeDelta] = useState(0.003);

  //산책 거리 계산
  const [walkDistance, setWalkDistance] = useState(0);

  // 칼로리
  const [calorie, setCalorie] = useState(0);

  // jobID
  const [jobBoardID, setJobBoardID] = useState(0)

  if (props.jobBoardID > 0 && jobBoardID !== -1){
    if (jobBoardID !== props.jobBoardID){
      setJobBoardID(props.jobBoardID)
    }
    
  }
  
  
  // 이어서 하기
  useEffect(() => {
    if (jobBoardID > 0){
      const retrieveData = async () => {
        const value = await AsyncStorage.getItem('memberID');
        // console.log(value)
        setMemberID(value)
  
      };
      retrieveData()
      // console.log('wwww : ', props.jobBoardID)
      const dataRef = ref(rdb, `walkRoute/${jobBoardID}`);
      onValue(dataRef, (snapshot) => {
          
          // console.log(snapshot)
          const newMark = [];
          snapshot.forEach((childSnapshot) => {
              if (childSnapshot.val().number === 0) {
                  setStartLatitude(childSnapshot.val().latitude)
                  setStartLongitude(childSnapshot.val().longitude)
              } else if (childSnapshot.val().number >= 1) {
                  setCountMark(true)
              }
              
              setLongitude(childSnapshot.val().longitude)
              setLatitude(childSnapshot.val().latitude)
              setCalorie(childSnapshot.val().calorie)
              setWalkDistance(childSnapshot.val().walkDistance)
              newMark.push(childSnapshot.val())
              props.setStart(true)
              // props.setTime(childSnapshot.val().walkStartTime.getTime() - )
              setWalkStartTime(childSnapshot.val().walkStartTime)
              // console.log(childSnapshot)
          })
          console.log('route : ',newMark)
          if (newMark.length > 1) {
            console.log('route : ',newMark)
            setMarkaxis(newMark)
          // } else {
          //   const dataRef = ref(rdb, `walkRoute/0`);
          //   set(dataRef, null)
          }
          
          })
    }
    
  }, [jobBoardID])
  



  // 산책 종료
  const goToMainPage = () => {
    const removeData = async () => {
      try {
        await AsyncStorage.removeItem('jobBoardID');
        console.log('데이터 제거 성공!');
      } catch (error) {
        console.error('데이터 제거 중 오류 발생:', error);
      }
    };
    removeData()
    console.log(1)
    const totalTime = props.totalTime
    const StartTime = walkStartTime.slice(0, 19)
    const jobBoard = props.jobBoardID
    // console.log(StartTime, 22)
    // 여기다가 API ㄱㄱ  ㄱㄱㄱㄱ
    // console.log(StartTime, totalTime, markaxis, walkDistance, calorie, jobBoard, memberID)
    console.log(2)
    const handlePost = async () => {
      try {
        const response = await CompleteWalk({
          StartTime, // v
          totalTime,  // v
          markaxis,  // v
          walkDistance, // v
          calorie, // v
          jobBoard, // v
          memberID, // Bum
        });
      } catch (error) {
        console.error("게시글 등록 중 오류 발생:", error);
      }
    };
    handlePost()
    console.log(3)

    // FireBase 지우기
    
    
    
    console.log(4)
    Alert.alert(
      '산책종료',                  // 제목
      '산책을 정말 종료하시겠습니까?',  // 내용
      [
        { text: '확인', onPress: () => {
          setJobBoardID(-1)
          props.setStart(false)
          const databaseRef = ref(rdb, `walkRoute/${props.jobBoardID}`);
          set(databaseRef, null)
          .then(() => {
            console.log('Data removed successfully');
          })
          .catch((error) => {
            console.error('Error removing data:', error);
          }); 
          const dataRef = ref(rdb, `jobBoard/${props.jobemail}`);
          set(dataRef, null)
          .then(() => {
            console.log('Data removed successfully');
          })
          .catch((error) => {
            console.error('Error removing data:', error);
          }); 
          const dataRef2 = ref(rdb, `jobBoard/${props.jobBoardID}`);
          set(dataRef2, null)
          .then(() => {
            console.log('Data removed successfully');
          })
          .catch((error) => {
            console.error('Error removing data:', error);
          }); 
          // 'MainPage'로 이동
          navigation.navigate('Mainhome', { screen: 'MainPage' });
          
        } },
        { text: '취소', onPress: () => console.log('취소') },
      ],
      { cancelable: false }   // 사용자가 배경을 터치해도 창이 닫히지 않도록 설정
    );
    
  };




  
  useEffect(() => {
    if (jobBoardID > 0) {
      const id = setInterval(() => {
      
        const dataRef = ref(rdb, `walkRoute/${props.jobBoardID}/${markaxis.length}`);
        // console.log('이게 왜 갑자기 4냐? : ', markaxis)
        const ask = async () => {
          try {
            const { coords: { latitude, longitude } } = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
            setLatitude(latitude)
            setLongitude(longitude)
            
            
  
            if (markaxis.length !== 0){
              const lastIndex = markaxis.length - 1
              // console.log(markaxis[lastIndex], 1)
              if (markaxis[lastIndex].latitude !== latitude || markaxis[lastIndex].longitude !== longitude){
                
                const new_markaxis = [...markaxis, {
                  
                  latitude : latitude,
                  longitude : longitude,
                  latitudeDelta : latitudeDelta,
                  longitudeDelta : longitudeDelta
                }]
                setMarkaxis(new_markaxis)
                const exaxis = {latitude : markaxis[lastIndex].latitude, longitude : markaxis[lastIndex].longitude }
                const axis = {latitude : latitude, longitude : longitude }
                
                const newdistance = haversine(exaxis, axis) + walkDistance
                setWalkDistance(newdistance)
                // 칼로리 계산도 여기서 하면 돼
                const kg = 15
                const new_calorie = newdistance * 1.60934 * kg * 0.453592 * 8
                setCalorie(new_calorie)
  
                const newRouteData = {
                  walkDistance : newdistance,
                  calorie : new_calorie,
                  number : markaxis.length,
                  latitude: latitude,
                  longitude: longitude,
                  latitudeDelta : latitudeDelta,
                  longitudeDelta : longitudeDelta,
                  walkStartTime : walkStartTime
                };
                
                // const newPostRef = push(dataRef); 
                set(dataRef, newRouteData)
                .then(() => {
                  console.log('데이터가 성공적으로 추가되었습니다.');
                })
                .catch((error) => {
                  console.error('데이터 추가 중 오류 발생:', error);
                });
  
              }
              if (markaxis.length >= 1){
                setCountMark(true)
                
              }
            } else {
              const newDate = new Date()
              const newRouteData = {
                walkDistance : 0,
                calorie : 0,
                number : markaxis.length,
                latitude: latitude,
                longitude: longitude,
                latitudeDelta : latitudeDelta,
                longitudeDelta : longitudeDelta,
                walkStartTime : newDate.toISOString()
              };
              
              // const newPostRef = push(dataRef); 
              set(dataRef, newRouteData)
              .then(() => {
                console.log('데이터가 성공적으로 추가되었습니다.');
              })
              .catch((error) => {
                console.error('데이터 추가 중 오류 발생:', error);
              });
  
              const new_markaxis = [...markaxis, {
                latitude : latitude,
                longitude : longitude,
                latitudeDelta : latitudeDelta,
                longitudeDelta : longitudeDelta
              }]
              
              setMarkaxis(new_markaxis)
              props.setStart(true)
              setStartLatitude(latitude)
              setStartLongitude(longitude)
              setWalkStartTime(newDate.toISOString())
  
            }
            
          } catch (e) {
            console.log('fail')
          }
          
          
        }
        ask()
        
      }, 5000);
      
      return () => clearInterval(id);
    }
      
  }, [longitude, latitude, jobBoardID])
  



  return (
    <View>
      
      <View>
      {(latitude === 0 || jobBoardID === 0) ? (
        <Text style={styles.loading}>Loading...</Text>
      )
      : (
      
        <View style={styles.container}>
        
        {countMark ? (
          
          <MapView
          style={styles.map}
          region={{
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: latitudeDelta,
            longitudeDelta: longitudeDelta,
          }}
          provider={PROVIDER_GOOGLE}>
          

          
          <Marker
            coordinate={{
              latitude: startLatitude,
              longitude: startLongitude,
            }}
            pinColor="#FF0000"
            cluster={false}
          >
            <Image source={{uri : 'https://kkori-bucket.s3.ap-northeast-2.amazonaws.com/f8b3a8c7-6c84-4151-8479-ae93d80dd2d0d4ea0824-fb35-44aa-af50-2e5042287b27.jpg'}} style={{ width: 40, height: 40, borderRadius : 30, borderRadius : 30, borderColor : '#0B80C5', borderWidth : 2 }} />
            
          </Marker>
          <Marker
              coordinate={{
                  latitude: latitude,
                  longitude: longitude,
              }}
              pinColor="#FF0000"
              cluster={false}
          >
          
            <Image source={{uri : 'https://kkori-bucket.s3.ap-northeast-2.amazonaws.com/%EC%A0%95%EC%A7%84%EC%86%94%EB%8B%98.jpg'}} style={{ width: 40, height: 40, borderRadius : 30, borderRadius : 30, borderColor : '#0B80C5', borderWidth : 2  }} />
          </Marker>
          <Polyline coordinates={markaxis} strokeWidth={5} strokeColor={'#0B80C5'} />
          
          
          
          </MapView>
        )
        : (
          <MapView
          style={styles.map}
          region={{
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: latitudeDelta,
            longitudeDelta: longitudeDelta,
          }}
          provider={PROVIDER_GOOGLE}>
          
          <Marker
              coordinate={{
                  latitude: latitude,
                  longitude: longitude,
              }}
              pinColor="#FF0000"
              cluster={false}
          >
            <Image source={{uri : 'https://kkori-bucket.s3.ap-northeast-2.amazonaws.com/%EC%A0%95%EC%A7%84%EC%86%94%EB%8B%98.jpg'}} style={{ width: 40, height: 40, borderRadius : 30, borderColor : '#0B80C5', borderWidth : 2 }} />
          </Marker>
          </MapView>
        )
        } 
        {/* <Polyline coordinates={markaxis} strokeWidth={13}  />*/}
        <View style={styles.info}>
          <View style={styles.info3}>
            <View style={styles.info2}>
                <Text style={styles.distance}>산책 거리 </Text>
                <Text style={styles.distance}>{walkDistance.toFixed(2)} km</Text>
            </View>
            <Text style={styles.distance}> |</Text>
            <View style={styles.info2}>
                <Text style={styles.calorie}>칼로리 </Text>
                <Text style={styles.calorie}>{calorie.toFixed(2)} cal</Text>
            </View>
            
          </View>
          <View style={{height : '10%'}}></View>
          <TouchableOpacity 
              style={styles.end}
              onPress={goToMainPage}
            >
            <View>
              <Text style={styles.endText}>산책 완료</Text>
            </View>
          </TouchableOpacity>
        </View>
        
        
      </View>
        
      
      )
      }
      </View>
      
    </View>
  )
}



const styles = StyleSheet.create({
  container: {
    width : '100%',
    height : '100%',
  },
  map: {
    width: '100%',
    height: '100%'
  },
  loading : {
    width: '100%',
    height: '100%',
    display : 'flex',
    justifyContent : 'center',
    alignItems : 'center',
    textAlign : 'center'
 },
 customMarker: {
  width: '0.5',                 // 원하는 원의 크기로 설정
  height: '0.5',                // width와 동일한 값으로 설정
  backgroundColor: '#00000',
  borderRadius: 25,          // width와 height의 절반인 값으로 설정
  // borderColor: 'blue',
  // borderWidth: 1,
  alignItems: 'center',
  justifyContent: 'center',
},
distance : {
  fontSize : 15,
  textAlign : 'center',
  color : 'black'
},
calorie : {
  fontSize : 15,
  textAlign : 'center',
  color : 'black'
},
info : {
  position : 'absolute',
  bottom : 0,
  left : 0,
  height : '11%',
  backgroundColor : '#DEEEF7',
  width : '100%',
  flexDirection: 'column',
  justifyContent : 'center',
  alignItems :'center',
  
},
info2 : {
  flexDirection: 'row',
  justifyContent : 'space-evenly',
  alignItems :'center',
  flex : 1
},
info3 : {
  width : '90%',
  flexDirection: 'row',
  justifyContent : 'space-between',
  // alignItems :'center', 
  backgroundColor : 'white',
  borderRadius : 5,
},
end : {
  // position : 'absolute',
  // top : 0,
  backgroundColor : '#58A9D7',
  zIndex : 2,
  borderRadius : 5,
  width : '45%',
  
},
endText : {
  color : 'white',
  fontSize : 25,
  textAlign : 'center'
}

})


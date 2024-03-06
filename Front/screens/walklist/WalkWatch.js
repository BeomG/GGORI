import { View, Text, StyleSheet, Image} from 'react-native'
import React, { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PROVIDER_GOOGLE, Marker, Polyline } from 'react-native-maps';
import MapView from 'react-native-map-clustering';
import * as Location from 'expo-location';
import haversine from 'haversine';

import rdb from '../../firebaseConfig';
import { ref, push, onValue, off, serverTimestamp, set } from 'firebase/database';
// import { } from 'react-native';

export default function WalkWatch(props) {

  const [myNickName, setMyNickName] = useState('')

  

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

  const [jobBoardID, setJobBoardID] = useState(0);
  
  console.log(props.jobBoardID, '===========================================================================')
  if (props.jobBoardID > 0){
    if (jobBoardID !== props.jobBoardID){
      setJobBoardID(props.jobBoardID)
    }
    
  }

  useEffect(() => {
    if (jobBoardID > 0) {
      console.log(jobBoardID,'<<<<<<<<=====================================================================')
      const dataRef = ref(rdb, `walkRoute/${jobBoardID}`);
      onValue(dataRef, (snapshot) => {
  
          console.log(snapshot)
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
  
              console.log(childSnapshot)
          })
          setMarkaxis(newMark)
          })
          console.log(markaxis, 3)
    }
    
    }, [jobBoardID])
  



  return (
    <View>
      
      <View>
      {(latitude === 0) ? (
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
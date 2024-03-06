import { View, Text, StyleSheet, Image, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import * as Location from 'expo-location';
import WalkRoute from './WalkRoute'
import WalkWatch from './WalkWatch'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from '@react-navigation/native';
import rdb from '../../firebaseConfig';
import { ref, push, onValue, off, serverTimestamp, set, remove } from 'firebase/database';
export default function WalkList({ route }) {
  let master = false
  const navigation = useNavigation();
  const [postInfo, setPostInfo] = useState({})
  const [jobBoardID, setJobBoardID] = useState(0)
  const [jobEmail, setJobEmail] = useState('')

  const [time, setTime] = useState(0);
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [sec, setSec] = useState(0);

  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  const [start, setStart] = useState(false);

  const [myEmail, setMyEmail] = useState("---");
  const [myNickName, setMyNickName] = useState("");

  const [temp, setTemp] = useState(false)
  // console.log("WalkList", data);
  useEffect(() => {
    const fetchMyDetails = async () => {
      try {
        const myEmail = await AsyncStorage.getItem("email");
        const myNickName = await AsyncStorage.getItem("nickName");
        setMyEmail(myEmail); //==================================================================================================================
        setMyNickName(myNickName);
      } catch (error) {
        console.error("로그인안한듯?", error);
      }
    };
    fetchMyDetails();
  }, [])

  useEffect(() => {

    if (myEmail !== '---') {
      const data = route.params;
      // console.log(data, '====')
      if (data) {
        setJobBoardID(route.params.data.jobBoardID)
        const dataRef1 = ref(rdb, `jobBoard/${route.params.data.jobBoardId}`);
        onValue(dataRef1, (snapshot) => {
          console.log('result : ', snapshot.val().email)

          setJobEmail(snapshot.val().email)
        })
        const dataRef = ref(rdb, `jobBoard/${route.params.data.email}`);
        const newRouteData = {
          jobBoardID: route.params.data.jobBoardId
        };

        // const newPostRef = push(dataRef); 
        set(dataRef, newRouteData)
          .then(() => {
            console.log('데이터가 성공적으로 추가되었습니다. 1');
          })
          .catch((error) => {
            console.error('데이터 추가 중 오류 발생:', error);
          });
        const dataRef2 = ref(rdb, `jobBoard/${route.params.data.jobBoardId}`);
        const newRouteData2 = {
          email: route.params.data.email
        };

        // const newPostRef = push(dataRef); 
        set(dataRef2, newRouteData2)
          .then(() => {
            console.log('데이터가 성공적으로 추가되었습니다. 2');
          })
          .catch((error) => {
            console.error('데이터 추가 중 오류 발생:', error);
          });

        const storeData = async () => {
          try {
            await AsyncStorage.setItem('jobBoardID', `${route.params.data.jobBoardId}`);
            console.log(route.params.data.jobBoardId)
            console.log('시작')
          } catch (error) {
            console.error('데이터 저장 중 오류 발생:', error);
          }
        };
        storeData()
        setJobBoardID(route.params.data.jobBoardId)
      } else {
        // console.log('-======')
        const retrieveData = async () => {
          try {
            const value = await AsyncStorage.getItem('jobBoardID');
            console.log(value, '============')
            if (value !== null) {
              // 알바생이 시작 버튼을 눌렀단 거지롱.
              setJobBoardID(value)

              // 게시물 주인인지.
              const dataRef = ref(rdb, `jobBoard/${value}`);
              onValue(dataRef, (snapshot) => {
                console.log('result : ', snapshot.val().email)

                setJobEmail(snapshot.val().email)
              })

            } else {
              // 개주인임?
              console.log('개주인?')
              console.log(myEmail)

              const dataRef = ref(rdb, `jobBoard/${myEmail}`); //=================================================================================
              onValue(dataRef, (snapshot) => {

                if (snapshot.exists()) {
                  console.log('result : ', snapshot.val().jobBoardID)
                  setJobBoardID(snapshot.val().jobBoardID)
                  master = true
                  setTemp(true)
                } else {
                  master = false
                  setTemp(false)
                  setJobBoardID(0)
                }
              })
              if (master) {
                console.log('주인임.')
              } else {
                console.log('주안아닌가벼')
                Alert.alert(
                  '',                  // 제목
                  '산책 중이 아닙니다.',  // 내용
                  [
                    {
                      text: '확인', onPress: () => {

                        navigation.navigate('Mainhome', { screen: 'MainPage' });
                      }
                    }
                  ],
                  { cancelable: false }   // 사용자가 배경을 터치해도 창이 닫히지 않도록 설정
                );
              }
            }
          } catch (error) {
            console.error('데이터 검색 중 오류 발생:', error);
          }
        };
        retrieveData()
      }
    }

    // setJobBoardID(route.params)
    // console.log(data, 222222222222)
  }, [jobBoardID, myEmail])



  useEffect(() => {

    // console.log(myNickName);
    if (start) {
      const id = setInterval(() => {
        const newTime = time + 1;
        setTime(newTime);
        setHour(Math.floor(newTime / 3600))
        setMinute(Math.floor((newTime % 3600) / 60))
        setSec(newTime % 60)

      }, 1000);
      return () => clearInterval(id);
    }
  }, [time, start]);
  // console.log(myNickName, 22222)
  // console.log(jobEmail)
  // console.log(myEmail)
  return (
    <View>
      <>{(!temp) ? ( //==============================================================================================
        <WalkRoute setStart={setStart} totalTime={time} setTime={setTime} jobBoardID={jobBoardID} jobemail={jobEmail} />
      )
        : (
          <WalkWatch setStart={setStart} setTime={setTime} jobBoardID={jobBoardID} />
        )}
      </>
      <View style={styles.box}>
        <View style={styles.info}>
          <View style={styles.info2}>
            <Text style={styles.timer}>
              산책 시간
            </Text>
            <Text style={styles.timer2}>
              {hour > 9 ? (hour.toString()) : ('0' + hour.toString())}:
              {minute > 9 ? (minute.toString()) : ('0' + minute.toString())}:
              {sec > 9 ? (sec.toString()) : ('0' + sec.toString())}</Text>
          </View>
          <View style={styles.info3}>
            <Text style={styles.timer}>진솔</Text>
            <Image source={{ uri: 'https://kkori-bucket.s3.ap-northeast-2.amazonaws.com/%EC%A0%95%EC%A7%84%EC%86%94%EB%8B%98.jpg' }} style={{ width: '30%', height: '90%', borderColor: '#0B80C5', borderWidth: 2 }} />
          </View>

        </View>
        <View>

        </View>
      </View>


    </View>
  );
}
const styles = StyleSheet.create({
  timer: {
    fontSize: 20,
  },
  timer2: {
    fontSize: 30,
    textAlign: 'left',
  },
  info: {
    position: 'absolute',
    top: '5%',
    // height : '7%',
    width: '100%',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    // alignItems : 'center'
  },
  info2: {
    // position : 'absolute',
    width: '50%',
  },
  info3: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  box: {
    backgroundColor: '#DEEEF7',
    position: 'absolute',
    bottom: '11%',
    height: '12%',
    width: '100%',


  },
  center: {
    flex: 1,
    flexDirection: 'col',
    justifyContent: 'center'
  }

})

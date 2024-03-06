import "react-native-gesture-handler";
import React, {
  createContext,
  useContext,
  useCallback,
  useEffect,
  useState,
} from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  Button,
  Linking,
  ActivityIndicator,
} from "react-native";
import WebView from "react-native-webview";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome, Entypo } from "@expo/vector-icons";
import { createDrawerNavigator } from "@react-navigation/drawer";
import MainPage from "./screens/MainPage";
import Test from "./screens/Test";
import Walk from "./screens/Walk";
import ChatList from "./screens/ChatList";
import MyPage from "./screens/MyPage/MyPage";
import JobPost from "./screens/jobpost/JobPost";
import Map from "./screens/Map/Map";
import MapDetail from "./screens/Map/MapDetail";
import DropdownMenu from "./screens/DropMenu";
import AddJob from "./screens/jobpost/AddJob";
import JobDetail from "./screens/jobpost/JobDetail";
import Qrcode from "./screens/QRcode/Qrcode";
import ChatRoom from "./screens/chatroom/ChatRoom";
import MyDog from "./screens/MyPage/MyDog";
import MyDogWalk from "./screens/MyPage/MyDogWalk";
import PartTimeList from "./screens/MyPage/PartTImeList";
import Register from "./screens/MyPage/Register";
import WalkList from "./screens/walklist/WalkList";
import Login from "./screens/login/Login";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";
import WalkDetail from "./screens/MyPage/WalkDetail";
import Device from "./screens/MyPage/Device/Device";
import DvDetail from "./screens/MyPage/Device/DvDetail";
import DogDetail from "./screens/MyPage/DogDetail";
import LostDog from "./screens/lostdog/LostDog";
import WalkKing from "./screens/walkking/WalkKing";
import MultiPickDog from "./screens/jobpost/MultiPickDog";
import MyJobPost from "./screens/jobpost/MyJobPost";
import MyJobPostFix from "./screens/jobpost/MyJobPostFix";
import LostDogDetail from "./screens/lostdog/LostDogDetail";
import LostDogAdd from "./screens/lostdog/LostDogAdd";
import MyLostDog from "./screens/lostdog/MyLostDog";
import WalkStart from "./screens/QRcode/WalkStart";
import Like from "./screens/like/Like";
import MyDogWalkList from "./screens/MyPage/MyDogWalkList";

// 하단 네비바
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const AuthCheckScreen = ({ children }) => {
  const navigation = useNavigation();

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem("refreshToken");
      if (!token) {
        // 사용자가 로그인하지 않았을 경우
        alert("로그인 후 이용해주세요.");
        navigation.navigate("Mainhome", {
          screen: "MainPage",
          // params: { refresh: true },
        });
      }
    };

    checkToken();
  }, [navigation]);

  return children;
};

function ConditionalScreen({ navigation }) {
  const [hasToken, setHasToken] = useState(null);

  useEffect(() => {
    const checkForToken = async () => {
      try {
        const token = await AsyncStorage.getItem("refreshToken");
        setHasToken(Boolean(token));
      } catch (error) {
        console.error("Error checking for token:", error);
      }
    };

    checkForToken();
  }, []);

  const onTokenSaved = () => {
    setHasToken(true);
  };

  const onTokenRemoved = () => {
    setHasToken(false);
  };

  if (hasToken === null) {
    return null; // You can render a loading spinner here if desired
  }

  return hasToken ? (
    <MyPage navigation={navigation} onTokenRemoved={onTokenRemoved} />
  ) : (
    <Login onTokenSaved={onTokenSaved} />
  );
}

// 네브바 아이콘 설정
function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let iconLibrary = FontAwesome;

          if (route.name === "Mainhome") {
            iconName = "home";
          } else if (route.name === "WalkStatus") {
            iconName = "paw";
          } else if (route.name === "Chat") {
            iconName = "comment";
          } else if (route.name === "UserInfo") {
            iconName = "user";
          } else if (route.name === "Back") {
            iconName = "arrow-left";
            iconLibrary = Entypo;
          }
          return iconLibrary === FontAwesome ? (
            <FontAwesome name={iconName} size={size} color={color} />
          ) : (
            <Entypo name={iconName} size={size} color={color} />
          );
        },
        tabBarActiveTintColor: "lightskyblue",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: [{ display: "flex" }, null],
      })}
    >
      {/* 하단네비 */}
      <Tab.Screen
        name="Mainhome"
        component={MainPage}
        options={{
          title: "메인",
          headerShown: false,

          headerTitle: () => <View style={{ marginTop: 50 }} />,
        }}
      />
      <Tab.Screen
        name="WalkStatus"
        component={JobPost}
        options={{
          title: "게시판",
        }}
      />
      <Tab.Screen
        name="Chat"
        component={ChatList}
        options={{ title: "채팅", headerTitleAlign: "center" }}
        listeners={({ navigation, route }) => ({
          tabPress: (e) => {
            // 탭 클릭 이벤트를 중단하려면 기본 이벤트를 방지합니다.
            e.preventDefault();

            // 인증 상태를 확인하는 함수 (예시입니다, 실제 로직에 맞게 수정하세요)
            const checkAuth = async () => {
              const token = await AsyncStorage.getItem("refreshToken");
              if (token) {
                // 토큰이 유효하면 해당 탭으로 이동
                navigation.navigate(route.name);
              } else {
                // 토큰이 유효하지 않으면 로그인 화면으로 이동
                alert("로그인 후 이용해주세요.");
                navigation.navigate("Mainhome", {
                  screen: "MainPage",
                  // params: { refresh: true },
                });
              }
            };

            checkAuth();
          },
        })}
      />
      {/* <Tab.Screen
        name="Chat"
        component={ChatList}
        options={{ title: "채팅" }}
      /> */}
      <Tab.Screen
        name="UserInfo"
        component={ConditionalScreen}
        options={{ title: "내정보" }}
      />
    </Tab.Navigator>
  );
}

// 네비게이터 쓸라면 여기적어
function MainNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Tabs"
        component={TabNavigator}
        options={{ headerShown: false, headerTitle: "뒤로" }}
        style={{ color: "black" }}
      />
      <Stack.Screen name="Map" component={Map} />
      <Stack.Screen name="LostDog" component={LostDog} />

      <Stack.Screen name="MapDetail" component={MapDetail} />
      <Stack.Screen
        name="JobDetail"
        component={JobDetail}
        options={{ headerTitle: "게시물" }}
      />
      <Stack.Screen
        name="AddJob"
        component={AddJob}
        options={{ headerTitle: "게시글 작성" }}
      />

      <Stack.Screen name="Qrcode">
        {(props) => (
          <AuthCheckScreen>
            <Qrcode {...props} />
          </AuthCheckScreen>
        )}
      </Stack.Screen>
      <Stack.Screen name="WalkKing" component={WalkKing} />
      <Stack.Screen name="ChatList" component={ChatList} />
      <Stack.Screen name="ChatRoom" component={ChatRoom} />
      <Stack.Screen name="나의 강아지" component={MyDog} />
      <Stack.Screen name="강아지 산책 내역" component={MyDogWalk} />
      <Stack.Screen
        name="MyDogWalkList"
        component={MyDogWalkList}
        options={{ headerTitle: "선택한 강아지 산책 내역" }}
      />
      <Stack.Screen name="알바 내역" component={PartTimeList} />
      <Stack.Screen name="강아지 등록" component={Register} />
      <Stack.Screen name="산책 상세정보" component={WalkDetail} />
      <Stack.Screen name="산책현황">
        {(props) => (
          <AuthCheckScreen>
            <WalkList {...props} />
          </AuthCheckScreen>
        )}
      </Stack.Screen>
      <Stack.Screen name="기기 등록" component={Device} />
      <Stack.Screen name="기기 관리" component={DvDetail} />
      <Stack.Screen name="강아지 상세정보" component={DogDetail} />
      <Stack.Screen name="강아지 선택" component={MultiPickDog} />
      <Stack.Screen name="LostDogDetail" component={LostDogDetail} />
      <Stack.Screen name="LostDogAdd" component={LostDogAdd} />
      <Stack.Screen name="MyLostDog" component={MyLostDog} />
      <Stack.Screen
        name="산책 시작"
        component={WalkStart}
        options={{ headerTitle: "해당 견주와 예약된 게시물" }}
      />
      <Stack.Screen name="Like" component={Like} />
      <Stack.Screen name="MyJobPost" component={MyJobPost} />
      <Stack.Screen name="MyJobPostFix" component={MyJobPostFix} />
      {/* <Stack.Screen
        name="JobPost"
        component={JobPost}
        options={{
          presentation: "card",
          headerTitle: () => <DropdownMenu />,
          headerTitleAlign: "center",
        }}
      /> */}
    </Stack.Navigator>
  );
}

// 왼쪽 상단 탭바
function DrawerNavigator() {
  return (
    <Drawer.Navigator initialRouteName="Main">
      <Drawer.Screen
        name="이건상단바"
        component={MainNavigator}
        options={{
          drawerLabel: "1번",
          headerTitle: () => (
            <Image
              source={require("./assets/main/꼬리.png")}
              style={{
                width: 150,
                height: 100,
                resizeMode: "contain",
                margin: 10,
              }}
            />
          ),
          headerTitleAlign: "center",
        }}
      />
      <Drawer.Screen
        name="이야"
        component={MainNavigator}
        options={{ drawerLabel: "2번" }}
      />
    </Drawer.Navigator>
  );
}

export default function App() {
  // 위치 불러오기
  return (
    // 뒤로가기 기능은 아직 미구현

    <NavigationContainer>
      <DrawerNavigator />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

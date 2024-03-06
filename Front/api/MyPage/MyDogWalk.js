import { baseAxios } from "../Axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// 해당 강아지 산책 내역
export async function MyDogWalk(dogId) {
  try {
    const token = await AsyncStorage.getItem("refreshToken");
    const res = await baseAxios.get(`walk/detail/by-member/${dogId}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res;
  } catch (e) {
    console.error(e);
  }
}

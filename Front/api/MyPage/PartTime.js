import { baseAxios } from "../Axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// 알바 리스트
export async function PTList() {
  try {
    const token = await AsyncStorage.getItem("refreshToken");
    const res = await baseAxios.get("reserved-job/all/by-sitter", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return res;
  } catch (e) {
    console.error(e);
  }
}

// 산책 상세 보기
export async function WalkInfo(postId) {
  try {
    const token = await AsyncStorage.getItem("refreshToken");
    const res = await baseAxios.get(`walk/detail/by-sitter/${postId}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res;
  } catch (e) {
    console.error(e);
  }
}

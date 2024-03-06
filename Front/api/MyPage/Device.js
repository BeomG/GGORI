import { baseAxios } from "../Axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// 기기 등록
export async function RegistDevice(props) {
  try {
    const token = await AsyncStorage.getItem("refreshToken");
    const res = await baseAxios.post(
      "member/register-device",
      {
        deviceNumber: props.deviceNumber,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res;
  } catch (e) {
    console.error(e);
    return null;
  }
}

import { baseAxios } from "../Axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// 견주와 알바 연결된 게시물 찾기
export async function scanQr({ qrCode }) {
  console.log("qrCode", qrCode);
  try {
    const token = await AsyncStorage.getItem("refreshToken");
    const res = await baseAxios.get(`reserved-job/qr`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      params: {
        qrCode: qrCode,
      },
    });

    console.log(res.data);
    return res;
  } catch (e) {
    console.error(e);
  }
}

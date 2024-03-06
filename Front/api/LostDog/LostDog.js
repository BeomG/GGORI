import { baseAxios } from "../Axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// 정보 가져오기
export async function LDog() {
    try {
        // 토큰 불러오기
        const token = await AsyncStorage.getItem("refreshToken");
        console.log(token); // 토큰 출력

        const res = await baseAxios.get("dog/all/lost-dog", {
            headers: {
                "Content-Type": "application/json",
                // Authorization: `Bearer ${token}`,
            },
        });
        console.log(res)

        return res;
    } catch (e) {
        console.error(e);
    }
}




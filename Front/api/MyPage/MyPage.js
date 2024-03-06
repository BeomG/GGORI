import { baseAxios } from "../Axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// 정보 가져오기
export async function MyDetail() {
  try {
    // 토큰 불러오기
    const token = await AsyncStorage.getItem("refreshToken");
    console.log(token); // 토큰 출력

    const res = await baseAxios.get("member/detail", {
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

// 회원 닉네임 수정
export async function MyDetailUpdate(nickName) {
  try {
    // 토큰 불러오기
    const token = await AsyncStorage.getItem("refreshToken");
    const res = await baseAxios.put(
      "member/update",
      {
        nickName: nickName,
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
  }
}

//프로필 사진
export async function ProfileImgUpdate(props) {
  try {
    let formData = new FormData();

    const img = {
      uri: props.profileImg.uri,
      type: props.profileImg.blob.data.type,
      name: props.profileImg.blob.data.name,
    };

    if (Platform.OS != "android") {
      img.uri.replace("file://", "");
    }

    formData.append("profileImg", img);

    const token = await AsyncStorage.getItem("refreshToken");
    const res = await baseAxios.put("member/image/update", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });

    return res;
  } catch (e) {
    console.error(e);
    return null;
  }
}

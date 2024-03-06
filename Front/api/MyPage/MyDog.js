import { Platform } from "react-native";
import { baseAxios } from "../Axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
// 강아지 리스트 가져오기
export async function AllDog() {
  try {
    const token = await AsyncStorage.getItem("refreshToken");
    const res = await baseAxios.get("dog/all/by-member", {
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

// 강아지 정보 상세보기
export async function DogDetailapi(props) {
  try {
    const token = await AsyncStorage.getItem("refreshToken");
    const res = await baseAxios.get(`dog/detail/${props.dogId}`, {
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

// 강아지 등록하기
export async function RegisterDog(props) {
  try {
    let formData = new FormData();

    // // 이미지 파일을 File 객체로 추가
    // if (props.dogImage && props.dogImage.blob) {
    //   formData.append("Image", props.dogImage.blob);
    // }

    const img = {
      uri: props.dogImage.uri,
      type: props.dogImage.blob.data.type,
      name: props.dogImage.blob.data.name,
    };

    if (Platform.OS != "android") {
      img.uri.replace("file://", "");
    }

    formData.append("image", img);

    // 나머지 데이터를 JSON 형태로 변환 후 추가
    const data = {
      dogName: props.dogName,
      dogBirthDay: props.dogBirthDay,
      gender: props.gender,
      dogBreed: props.dogBreed,
      dogWeight: props.dogWeight,
      dogNeuter: props.dogNeuter,
    };

    formData.append("dog", JSON.stringify(data), { type: "application/json" });

    // formData.append(
    //   "dog",
    //   new Blob([JSON.stringify(data)], { type: "application/json" })
    // );

    const token = await AsyncStorage.getItem("refreshToken");
    const res = await baseAxios.post("dog/register-dog", formData, {
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

// 강아지 정보 수정
export async function UpdateDog(props) {
  try {
    let formData = new FormData();
    // // 이미지 파일을 File 객체로 추가
    // if (props.dogImage && props.dogImage.blob) {
    //   formData.append("Image", props.dogImage.blob);
    // }

    const img = {
      uri: props.dogImages.uri,
      type: props.dogImages.blob.data.type,
      name: props.dogImages.blob.data.name,
    };

    if (Platform.OS != "android") {
      img.uri.replace("file://", "");
    }

    formData.append("image", img);

    // 나머지 데이터를 JSON 형태로 변환 후 추가
    const data = {
      dogName: props.dogName,
      dogBirthDay: props.dogBirthDay,
      gender: props.gender,
      dogBreed: props.dogBreed,
      dogWeight: props.dogWeight,
      dogNeuter: props.dogNeuter,
    };

    formData.append("dog", JSON.stringify(data), { type: "application/json" });

    // formData.append(
    //   "dog",
    //   new Blob([JSON.stringify(data)], { type: "application/json" })
    // );

    const token = await AsyncStorage.getItem("refreshToken");
    const res = await baseAxios.put(`dog/modify/${props.dogId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });

    return res;
  } catch (e) {
    console.error("Error in UpdateDog:", e);
    return null;
  }
}

// 강아지 삭제
export async function DeleteDog(props) {
  try {
    const token = await AsyncStorage.getItem("refreshToken");
    const res = await baseAxios.delete(`dog/delete/${props.dogId}`, {
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

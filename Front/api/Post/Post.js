import { baseAxios } from "../Axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// 전체 게시글 리스트

export async function AllPost() {
  try {
    const res = await baseAxios.get("post/all", {
      headers: {
        "Content-Type": "application/json",
        Authorization: AsyncStorage.getItem("accessToken"),
      },
    });

    return res;
  } catch (e) {
    console.error(e);
  }
}

// 지역별 게시글 리스트
export async function PostRegion(props) {
  try {
    const res = await baseAxios.get(`post/${props}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: AsyncStorage.getItem("accessToken"),
      },
    });
    return res;
  } catch (e) {
    console.error(e);
  }
}

// 게시글 등록
export async function CreatePost({ title, content, payment, address, dogIds }) {
  try {
    const refreshToken = await AsyncStorage.getItem("refreshToken");
    console.log(refreshToken);
    const res = await baseAxios.post(
      "post-job",
      {
        title: title,
        content: content,
        payment: payment,
        address: address,
        dogIds: dogIds,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${refreshToken}`,
        },
      }
    );
    return res;
  } catch (e) {
    console.error(e);
    return null;
  }
}

// 게시글 수정
export async function UpdatePost(props) {
  try {
    const res = await baseAxios.post(
      `post/update/${props.post_id}`,
      {
        post_title: props.post_title,
        post_content: props.post_content,
        post_price: props.post_price,
        location: props.location,
        post_image: props.post_image,
        start_time: props.start_time,
        end_time: props.end_time,
        dog_id: props.dog_id,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: AsyncStorage.getItem("accessToken"),
        },
      }
    );
    return res;
  } catch (e) {
    console.error(e);
    return null;
  }
}

// 게시글 삭제
export async function DeletePost(props) {
  try {
    const res = await baseAxios.delete(`post/delete/${props.post_id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: AsyncStorage.getItem("accessToken"),
      },
    });
    return res;
  } catch (e) {
    console.error(e);
  }
}

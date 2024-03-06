import { baseAxios } from "../Axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function Reser (sitterEmail, jobBoardId) {
    try {
      const refreshToken = await AsyncStorage.getItem("refreshToken");
      console.log(refreshToken);
      const res = await baseAxios.post(
        `reserved-job/reserve/${sitterEmail}/${jobBoardId}`,
        {
            sitterEmail: sitterEmail,
            jobBoardId : jobBoardId,
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
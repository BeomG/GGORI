import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const baseAxios = axios.create({
  // baseURL: "https://ggori.kr/api/",
  baseURL: "https://kkori.kr/api/",
  headers: {
    "Content-Type": "application/json",
    Authorization: AsyncStorage.getItem("token"),
  },
  
});

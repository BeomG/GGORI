import React, { useState, useEffect, useRef } from "react";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Animated,
  Dimensions,
} from "react-native";
import BigModal from "./Modal/BigModal";
import SmallModal from "./Modal/SmallModal";
import { WalkInfo } from "../../api/MyPage/PartTime";

function WalkDetail({ navigation, route }) {
  const postId = route.params.postId;

  console.log("postId", postId);

  const [walkInfo, setWalkInfo] = useState(null);

  useEffect(() => {
    const fetchWalkInfo = async () => {
      try {
        const response = await WalkInfo(postId);
        setWalkInfo(response);
      } catch (error) {
        console.error("WalkInfo 호출 중 오류가 발생했습니다:", error);
      }
    };

    fetchWalkInfo();
  }, [postId]);

  console.log(walkInfo);

  const [latitude, setLatitude] = useState(35.15957832439106);
  const [longitude, setLongitude] = useState(126.8509394432431);
  const [latitudeDelta, setlatitudeDelta] = useState(0.3);
  const [longitudeDelta, setlongitudeDelta] = useState(0.3);

  const [modalHeight, setModalHeight] = useState("66%");
  const animatedHeight = useRef(
    new Animated.Value(Dimensions.get("window").height * 0.66)
  ).current;

  useEffect(() => {
    Animated.timing(animatedHeight, {
      toValue:
        modalHeight === "66%"
          ? Dimensions.get("window").height * 0.66
          : Dimensions.get("window").height * 0.34,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [modalHeight]);

  const handleModalToggle = () => {
    if (modalHeight === "66%") {
      setModalHeight("34%");
    }
  };

  const handleModalExpand = () => {
    if (modalHeight === "34%") {
      setModalHeight("66%");
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        onPress={() => {
          if (modalHeight === "66%") {
            handleModalToggle();
          }
        }}
        style={styles.map}
        region={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: latitudeDelta,
          longitudeDelta: longitudeDelta,
        }}
        provider={PROVIDER_GOOGLE}
      />

      <Animated.View style={[styles.centeredView, { height: animatedHeight }]}>
        <TouchableWithoutFeedback onPress={handleModalExpand}>
          <View style={{ flex: 1 }}>
            {modalHeight === "66%" ? <BigModal /> : <SmallModal />}
          </View>
        </TouchableWithoutFeedback>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  centeredView: {
    position: "absolute",
    width: "100%",
    bottom: 0,
    backgroundColor: "white",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default WalkDetail;

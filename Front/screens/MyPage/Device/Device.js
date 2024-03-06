import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, Button } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { RegistDevice } from "../../../api/MyPage/Device";

function Device({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    const res = await RegistDevice({ deviceNumber: data });
    console.log(typeof data, data);
    if (res) {
      alert(`기기가 등록되었습니다.`);
      navigation.navigate("UserInfo");
    } else {
      alert(`기기 등록에 실패하였습니다.`);
    }
  };

  if (hasPermission === null) {
    return <Text>카메라 권한 요청 중...</Text>;
  }
  if (hasPermission === false) {
    return <Text>카메라 접근 권한이 없습니다.</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && (
        <Button title={"다시 스캔하기"} onPress={() => setScanned(false)} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
});
export default Device;

import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, Button } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { scanQr } from "../../api/QR/QR";

function Qrcode({ navigation }) {
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

    try {
      const res = await scanQr({ qrCode: data });
      if (res) {
        navigation.navigate("산책 시작", { data: res.data });
      } else {
        alert("QR코드 데이터를 가져오는데 실패하였습니다.");
      }
    } catch (e) {
      console.error(e);
      alert("QR코드 데이터를 가져오는 중 에러가 발생하였습니다.");
    }
  };

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

export default Qrcode;

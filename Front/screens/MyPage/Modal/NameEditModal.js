import React, { useState } from "react";
import {
  Button,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

function NameEditModal({ visible, onConfirm, onCancel, onApplyUpdate }) {
  const [nickName, setNickName] = useState("");

  const handleConfirm = async () => {
    const res = await onApplyUpdate(nickName);
    if (res) {
      onConfirm(nickName);
      setNickName("");
    }
  };
  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.container}>
          <Text>원하는 닉네임을 입력하고 완료 버튼을 눌러주세요</Text>
          <View style={styles.container2}>
            <TextInput
              style={styles.txtIpt}
              placeholder="원하는 닉네임을 입력 하세요"
              onChangeText={setNickName} // 닉네임 상태 업데이트
              value={nickName} // 현재 닉네임 값을 보여줌
            />
            <View style={styles.btnBox}>
              <TouchableOpacity
                style={[styles.btn, { backgroundColor: "#58A9D7" }]}
                onPress={handleConfirm}
              >
                <Text style={{ color: "white" }}> 수정 완료 </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.btn, { backgroundColor: "#D9D9D9" }]}
                onPress={onCancel}
              >
                <Text> 닫기 </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
    height: "100%",
  },
  container: {
    height: "33.3%", // 화면의 3분의 2를 차지
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    gap: 40,
  },
  container2: {
    justifyContent: "center",
    alignItems: "center",
    gap: 30,
  },
  txtIpt: {
    height: 50,
    borderWidth: 1,
    borderColor: "#e1e1e1",
    width: "100%",
    padding: 10,
    borderRadius: 10,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  btnBox: {
    gap: 25,
    flexDirection: "row",
  },
  btn: {
    width: 80,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
});

export default NameEditModal;

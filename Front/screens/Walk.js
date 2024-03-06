import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

function Walk() {
  return (
    <View>
     <Image source={require('../assets/구라2.png')} style={styles.chatImage} />
    </View>
  );
}
const styles = StyleSheet.create({
    chatImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
});
export default Walk;
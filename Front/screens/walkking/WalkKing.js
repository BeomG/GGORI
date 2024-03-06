import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import * as Font from 'expo-font';


function WalkKing() {
    const [fontsLoaded, setFontsLoaded] = useState(false);

    async function loadFonts() {
        await Font.loadAsync({
            Yanolja: require('../../assets/fonts/bn7SPXz5ky3Zk8IES-DtwGQbpuI.ttf'),
            Baemin: require('../../assets/fonts/dHuf9CilzKxTAu4-fYI57Qin0jo.ttf'),
            Swagger: require('../../assets/fonts/AjwolahSsnvB7x4vKXxBgx-uvwc.ttf'),
            Sunsin: require('../../assets/fonts/Ci2y87N7Lcw6Ebgcagq95ilCS-Q.ttf'),
            Godick: require('../../assets/fonts/upLsblqk9BqR_bdSpzpD9Zi4EVE.ttf'),
            Baemindohyun: require('../../assets/fonts/rBC1R_TkgdvXlXY8FF2VsPmaosg.ttf'),
            Baeminyeon: require('../../assets/fonts/JSwFjfEgRWG3r-ns4tnb0BgBPqo.ttf'),
            Baemin11: require('../../assets/fonts/mhZplRGIhqXOm9DpPRipJ7nMX7U.ttf'),
        });
        setFontsLoaded(true);
    }

    useEffect(() => {
        loadFonts();
    }, []);

    if (!fontsLoaded) {
        return <ActivityIndicator size="large" />;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.tt}>안녕하세요 hello</Text>
            <Text style={styles.tt2}>안녕하세요 hello</Text>
            <Text style={styles.tt3}>안녕하세요 hello</Text>
            <Text style={styles.tt4}>안녕하세요 hello</Text>
            <Text style={styles.tt5}>안녕하세요 hello</Text>
            <Text style={styles.tt6}>안녕하세요 hello</Text>
            <Text style={styles.tt7}>안녕하세요 hello</Text>
            <Text style={styles.tt8}>안녕하세요 hello</Text>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    tt: {
        fontSize: 50,
        fontFamily: 'Yanolja',
    },
    tt2: {
        fontSize: 50,
        fontFamily: 'Baemin',
    },
    tt3: {
        fontSize: 50,
        fontFamily: 'Swagger',
    },
    tt4: {
        fontSize: 50,
        fontFamily: 'Sunsin',
    },
    tt5: {
        fontSize: 50,
        fontFamily: 'Godick',
    },
    tt6: {
        fontSize: 50,
        fontFamily: 'Baemindohyun',
    },
    tt7: {
        fontSize: 50,
        fontFamily: 'Baeminyeon',
    },
    tt8: {
        fontSize: 50,
        fontFamily: 'Baemin11',
    },


});

export default WalkKing;

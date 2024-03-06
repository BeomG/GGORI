import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { View, Text, Button } from 'react-native';

// 인증 상태 관리를 위한 Context 생성
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [userToken, setUserToken] = useState(null);

    // 로그인 상태 확인
    const checkLoginState = async () => {
        try {
            const token = await AsyncStorage.getItem('refreshToken');
            setUserToken(token);
            setIsLoading(false);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        checkLoginState();
    }, []);

    const authContext = {
        signIn: async (data) => {
            // 로그인 처리
            setIsLoading(false);
            setUserToken('dummy-token');
        },
        signOut: async () => {
            // 로그아웃 처리
            setIsLoading(false);
            setUserToken(null);
        },
        signUp: async (data) => {
            // 회원가입 처리
            setIsLoading(false);
            setUserToken('dummy-token');
        },
    };

    // 로딩 중 화면
    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <AuthContext.Provider value={authContext}>
            {children}
        </AuthContext.Provider>
    );
};
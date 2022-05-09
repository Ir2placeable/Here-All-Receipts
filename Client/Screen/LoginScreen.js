import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Button, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export function LoginScreen() {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // const _ANDROID_AVD_API_HOST = 'http://3.39.196.91:3001/login'; //localhost 테스트용
    // const _IOS_API_HOST = 'http://3.39.196.91:3001/login'; //localhost 테스트용

    const _ANDROID_AVD_API_HOST = 'http://10.0.2.2:7000/login'; //localhost 테스트용
    const _IOS_API_HOST = 'http://127.0.0.1:7000/login'; //localhost 테스트용

    async function onLogin() {
        if (!email || !password) { //비밀번호 확인이 제대로 되었나 탐지
            Alert.alert("아이디 혹은 비밀번호를 입력해주세요")
        }
        else {
            if (Platform.OS === 'ios') {
                fetch(_IOS_API_HOST, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        "email": email,
                        "password": password,
                    })
                }).then(res => res.json())
                    .then(res => {
                        if (res.loginSuccess) {
                            console.log(res.userId, res.name, "님이 로그인 하였습니다.");
                            navigation.navigate("Main");
                        }
                    })
            }
            else if (Platform.OS === 'android') {
                fetch(_ANDROID_AVD_API_HOST, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        "email": email,
                        "password": password,
                    })
                }).then(res => res.json())
                    .then(res => {
                        if (res.loginSuccess) {
                            console.log(res.userId, res.name, "님이 로그인 하였습니다.");
                            navigation.navigate("Main");
                        }
                    })
            }
        }
    }

    function goToRegister() {
        navigation.navigate("Register");
    }

    return (
        <View style={styles.container}>
            <View style={styles.topArea}>
                <View style={styles.titleArea}>
                    {/* <Image
                        source={require('../src/icon/logo.png')}
                        style={{ width: 50, height: 50 }}
                    /> */}
                    <Image
                        source={require('../src/icon/Login.png')}
                        style={{ width: wp(30), resizeMode: 'contain' }}
                    />
                </View>
                <View style={styles.TextArea}>
                    <Text style={styles.Text}>🧾여기, 모두의 영수증🧾</Text>
                    <Text style={styles.Text}>'여기모영' 에 오신것을 환영합니다!</Text>
                </View>
            </View>

            <View style={styles.formArea}>
                <TextInput
                    style={styles.textFormTop}
                    placeholder={'아이디'}
                    autoCapitalize='none'
                    onChangeText={(text) => { setEmail(text); }}
                />
                <TextInput
                    style={styles.textFormBottom}
                    placeholder={'비밀번호'}
                    autoCapitalize='none'
                    onChangeText={(text) => { setPassword(text); }}
                />
                <Text style={styles.TextValidation}>유효하지 않은 ID입니다.</Text>
            </View>
            <View style={{ flex: 0.5 }}>
                <View style={styles.btnArea}>
                    <TouchableOpacity style={styles.btn}
                        onPress={() => onLogin()}>
                        <Text style={(styles.Text, { color: 'white' })}>로그인</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ flex: 0.1 }}>
                <View style={styles.btnArea}>
                    <TouchableOpacity style={styles.btn_register}
                        onPress={() => goToRegister()}>
                        <Text style={(styles.Text, { color: 'white' })}>회원가입</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ flex: 2 }} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, //전체의 공간을 차지한다는 의미
        flexDirection: 'column',
        backgroundColor: '#f2f2f2',
        paddingLeft: wp(7),
        paddingRight: wp(7),
    },
    topArea: {
        flex: 1,
        marginTop: 150,
        paddingTop: wp(3),
    },
    titleArea: {
        flex: 0.7,
        justifyContent: 'center',
        paddingTop: wp(3),
    },
    TextArea: {
        flex: 0.3,
        justifyContent: 'center',
        backgroundColor: '#f2f2f2',
    },
    Text: {
        fontSize: wp('4%'),
    },
    TextValidation: {
        fontSize: wp('4%'),
        color: 'red',
        paddingTop: wp(2),
    },

    formArea: {
        justifyContent: 'center',
        // paddingTop: wp(10),
        flex: 1.5,
    },
    textFormTop: {
        // borderWidth: 2,
        // borderBottomWidth: 1,
        // borderColor: '#208cf7',
        backgroundColor: 'white',
        borderTopLeftRadius: 7,
        borderTopRightRadius: 7,
        borderBottomLeftRadius: 7,
        borderBottomRightRadius: 7,
        width: '100%',
        height: hp(6),
        paddingLeft: 10,
        paddingRight: 10,
        shadowColor: '#d3d3d3',
        shadowOffset: {
            width: 1,
            height: 1
        },
        shadowOpacity: 1,
        shadowRadius: 1,
    },
    textFormBottom: {
        marginTop: 10,
        backgroundColor: 'white',
        borderTopLeftRadius: 7,
        borderTopRightRadius: 7,
        borderBottomLeftRadius: 7,
        borderBottomRightRadius: 7,
        width: '100%',
        height: hp(6),
        paddingLeft: 10,
        paddingRight: 10,
        shadowColor: '#d3d3d3',
        shadowOffset: {
            width: 1,
            height: 1
        },
        shadowOpacity: 1,
        shadowRadius: 1,
    },
    btnArea: {
        height: hp(8),
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: hp(1.5),
    },
    btn: {
        flex: 1,
        width: '100%',
        borderRadius: 7,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#208cf7',
    },
    btn_register: {
        flex: 1,
        width: '100%',
        borderRadius: 7,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#215180',
    },
});

export default LoginScreen


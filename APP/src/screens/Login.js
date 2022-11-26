import { StyleSheet, TouchableOpacity, View, Image, useWindowDimensions, Text, TextInput } from "react-native";
import React, { useState, useContext } from 'react';
import Logo from '../../assets/images/SA2-logo.png';
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../api';
import { Context } from '../context/authContext';
import { Ionicons  } from '@expo/vector-icons'

const Login = ({ navigation }) => {
    const { dispatch } = useContext(Context);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onLoginPressed = async () => {
        try {
            const authData = await api.post('/login', {
                email: email,
                password: password
            })
            console.log(authData)
            if(authData.status === 200){
                await AsyncStorage.setItem('token', authData.data.token)
                dispatch({type:'logIn', payload: true})
            } else {
                alert('Email ou Senha Inválidos')
                setPassword('')
            }
        } catch (error) {
            alert('Email ou Senha Inválidos')
            setPassword('')
        }
    }

    const { height } = useWindowDimensions();

    return (
        <View style={styles.view}>
            <Image
                source={Logo}
                style={[styles.logo, { height: height * 0.4 }]}
                resizeMode="contain"
            />
            <Text style={styles.frase}> Grooming mais exclusivo e organizado</Text>

            <CustomInput
                placeholder="Email"
                value={email}
                setValue={setEmail}
            />

            <CustomInput
                placeholder="Password"
                value={password}
                setValue={setPassword}
                secureTextEntry={true}
            />

            <CustomButton text="Login" onPress={onLoginPressed} />

            <TouchableOpacity
                onPress={() => navigation.navigate("RegisterUser")}
            >
                <Text style={styles.texto}>
                    Primeiro acesso?{" "}
                    <Text style={styles.resgistrese}>
                        Registre-se
                    </Text>
                </Text>
            </TouchableOpacity>

        </View>
    )
};

const styles = StyleSheet.create({
    view: {
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#9F94FC',
        flex: 1
    },
    logo: {
        width: '100%',
        maxWidth: 500,
        maxHeight: 400,
        
    },
    frase: {
        fontWeight: "bold",
        color: "#4536E3",
        padding: 20,
    },
    resgistrese: {
        fontWeight: "bold",
        color: "#4536E3",
    },
    texto: {
        color: "#4536E3",
    }
    
});

export default Login;
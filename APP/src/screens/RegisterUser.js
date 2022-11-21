import { StyleSheet, Text, View, Image, useWindowDimensions, TouchableOpacity, Picker } from "react-native";
import React, { useState } from 'react';
import Logo from '../../assets/images/SA2 - logo.png';
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import api from '../api'


const RegisterUser = ({ navigation }) => {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [nascimento, setNascimento] = useState('');
    const [telefone, setTelefone] = useState('');
    const [cep, setCep] = useState('');
    const [numcasa, setNumcasa] = useState('');
    const [password, setPassword] = useState('');
    const [confirmepassword, setConfirmeassword] = useState('');
    const [admin, setAdmin] = useState(false);

    const { height } = useWindowDimensions();
    
    const onRegisterPressed = async () => {
        try {
            const data = await api.post('/user/register', {
                nome: nome,
                email: email,
                nascimento: nascimento,
                telefone: telefone,
                cep: cep,
                numcasa: numcasa,
                password: password,
                confirmepassword: confirmepassword,
                admin: admin
            });
            if (data.status === 200) {
                console.log(data)
                alert(data.data.message)
                navigation.navigate('Login')
            } else {
                console.log(data)
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <View style={styles.view}>
            <Image
                source={Logo}
                style={[styles.logo, { height: height * 0.4 }]}
                resizeMode="contain"
            />

            <CustomInput
                placeholder="Nome Completo"
                value={nome}
                setValue={setNome}
            />

            <CustomInput
                placeholder="E-mail"
                value={email}
                setValue={setEmail}
            />
            
            <CustomInput
                placeholder="Data de Nascimento"
                value={nascimento}
                setValue={setNascimento}
            />

            <CustomInput
                placeholder="Telefone"
                value={telefone}
                setValue={setTelefone}
            />

            <CustomInput
                placeholder="CEP"
                value={cep}
                setValue={setCep}
            />

            <CustomInput
                placeholder="Nº da Casa"
                value={numcasa}
                setValue={setNumcasa}
            />

            <CustomInput
                placeholder="Password"
                value={password}
                setValue={setPassword}
                secureTextEntry={true}
            />

            <CustomInput
                placeholder="Confrime Password"
                value={confirmepassword}
                setValue={setConfirmeassword}
            />
   
            <Picker
                selectedValue={admin}
                style={styles.picker}
                onValueChange={setAdmin}
            >
                <Picker.Item label="Admin User" value="true" />
                <Picker.Item label="Regular User" value="false" />
            </Picker>

            <CustomButton text="Salvar" onPress={onRegisterPressed} />
            <TouchableOpacity
                onPress={() => navigation.navigate("Login")}
            >
                <Text style={styles.texto}>
                    Já possui uma conta?{" "}
                    <Text style={styles.login}>Login</Text>
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
        width: '70%',
        maxWidth: 300,
        maxHeight: 200,
        padding: 20,
    },
    login: {
        fontWeight: "bold",
        color: "#4536E3",
    },
    texto: {
        color: "#4536E3", 
    },
    picker: {
        marginVertical: 5,
        borderRadius: 5,
        backgroundColor: 'white',
        textAlignVertical: 'center',
        padding: 15,
        fontSize: '14px',
        fontWeight: 'bold',
        borderWidth: 0,
        height: 50,
        width: '100%'
    }
});

export default RegisterUser;
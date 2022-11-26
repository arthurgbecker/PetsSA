import { StyleSheet, View, Image, useWindowDimensions, Picker, Text } from "react-native";
import React, { useState } from 'react';
import Logo from '../../assets/images/SA3-logo.png';
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import api from '../api'
import { Ionicons } from '@expo/vector-icons'
import RegisterService from "./RegisterService";

const RegisterPetshop = ({ navigation }) => {
    const [nomepetshop, setNomepetshop] = useState('');
    const [proprietario, setProprietario] = useState('');
    const [cnpj, setCNPJ] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [endereco, setEndereco] = useState('');

    const { height } = useWindowDimensions();

    const onRegisterPressed = async () => {
        try {
            const authData = await api.post("/petshop/register", {
                nomepetshop: nomepetshop,
                proprietario: proprietario,
                cnpj: cnpj,
                email: email,
                telefone: telefone,
                endereco: endereco
            });
            if (authData.status === 200) {
                console.log(authData.data.message)
                alert(authData.data.message)
                navigation.navigate("Home");
            }
            else {
                console.log(authData.data.message)
            }
        }
        catch (e) {
            console.log(e)
        }
    }

    return (
        <View style={styles.view}>

            <Text style={styles.descricao1}>Pets Sa</Text>
            <Text style={styles.descricao}>CNPJ: 111111111111</Text>
            <Text style={styles.descricao}>E-mail: petssa@gmail.com</Text>
            <Text style={styles.descricao}>Telefone: (48)9 9999-9999</Text>
            <Text style={styles.descricao}>Endereço: Rua aquela la - Florianópolis</Text>
            <Text style={styles.descricao}>Proprietario: JavaLees</Text>

            <View style={styles.botoes}>
                <Ionicons.Button style={styles.iconbutton}
                    name="add-circle"
                    backgroundColor="#AFF4D4"
                    color='#4536E3'
                    onPress={() => navigation.navigate("RegisterService")}>
                    Serviço
                </Ionicons.Button>

            </View>

        </View>
    )
};

const styles = StyleSheet.create({
    view: {
        flex: 1,
        padding: 20,   
    },
    botoes: {
        margin: 10,
        flexDirection: 'column-reverse',
        flex: 3,
        alignItems: 'center',  
    },
    logo: {
        width: '70%',
        maxWidth: 300,
        maxHeight: 200,
        margin: 18
    },
    loginText: {
        fontWeight: "bold",
        color: "#6200ee",
    },
    descricao: {
        fontWeight: "bold",
        fontSize: 15,
        padding: 4

    },
    descricao1: {
        fontWeight: "bold",
        fontSize: 20,
        padding: 4,
        alignItems: 'center'

    },
    iconbutton: {

    }
});

export default RegisterPetshop
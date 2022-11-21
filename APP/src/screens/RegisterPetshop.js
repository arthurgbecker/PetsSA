import { StyleSheet, View, Image, useWindowDimensions, Picker, Text } from "react-native";
import React, { useState } from 'react';
import Logo from '../../assets/images/SA3 - logo.png';
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


            {/* <Image
                source={Logo}
                style={[styles.logo, { height: height * 0.3 }]}
                resizeMode="contain"
            /> */}


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
                    Serviços
                </Ionicons.Button>

                <Ionicons.Button style={styles.iconbutton}
                    name="add-circle"
                    backgroundColor="#AFF4D4"
                    color='#4536E3'
                    onPress={() => navigation.navigate("Home")}>
                    Planos
                </Ionicons.Button>
            </View>
            {/* <CustomInput
                placeholder="Nome da PetShop"
                value={nomepetshop}
                setValue={setNomepetshop}
            />

            <CustomInput
                placeholder="CNPJ"
                value={cnpj}
                setValue={setCNPJ}
            />

            <CustomInput
                placeholder="E-mail"
                value={email}
                setValue={setEmail}
            />

            <CustomInput
                placeholder="Telefone"
                value={telefone}
                setValue={setTelefone}
            />

            <CustomInput
                placeholder="Endereço"
                value={endereco}
                setValue={setEndereco}
            />

            <CustomInput
                placeholder="Nome do Proprietário"
                value={proprietario}
                setValue={setProprietario}
            />

            <CustomButton text="Salvar" onPress={onRegisterPressed} /> */}


        </View>
    )
};

const styles = StyleSheet.create({
    view: {
        flex: 1,
        padding: 20,   
    },
    botoes: {
        margin: 40,
        flexDirection: 'row',
        flex: 3,
        justifyContent: 'space-between',
        alignItems: 'flex-end',  
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
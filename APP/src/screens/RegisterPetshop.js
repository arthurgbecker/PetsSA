import { StyleSheet, View, Image, useWindowDimensions, Text } from "react-native";
import React, { useState } from 'react';
import Logo from '../../assets/images/SA3logo.png';
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import api from '../api'
import { Ionicons } from '@expo/vector-icons'
import RegisterService from "./RegisterService";
import { Picker } from "@react-native-picker/picker";

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
            <View style={styles.imagem}>
            <Image
                source={Logo}
                style={[styles.logo, { height: 260 }]}
                resizeMode="contain"
            />
</View>
            <Text style={styles.descricao1}>Pets S.A.</Text>
            <Text style={styles.descricao}>CNPJ: 05.533.407/0001-10</Text>
            <Text style={styles.descricao}>E-mail: petssa@petssa.com</Text>
            <Text style={styles.descricao}>Telefone: (48) 90800-0800</Text>
            <Text style={styles.descricao}>Endereço: Rua de Exemplo - Florianópolis</Text>
            <Text style={styles.descricao}>Proprietário: JavaLees</Text>

            <View style={styles.botoes}>

                <Ionicons.Button
                    name="add-circle"
                    backgroundColor="#AFF4D4"
                    color="#4536E3"
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
        padding: 25,
    },
    botoes: {
        margin: 20,
        flexDirection: 'column-reverse',
        flex: 1,
        alignItems: 'center',
    },
    logo: {
        width: '80%',
        maxWidth: 350,
        maxHeight: 250,
        marginVertical: 15,
    },
    imagem: {
        alignItems: 'center'
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
    }

});

export default RegisterPetshop
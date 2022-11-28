import { StyleSheet, View, Image, useWindowDimensions, TouchableOpacity, Text } from "react-native";
import React, { useState } from 'react';
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import api from '../api'
import { Ionicons } from '@expo/vector-icons'
import { Picker } from "@react-native-picker/picker";

import * as ImagePicker from "expo-image-picker";

const RegisterService = ({ navigation }) => {
    // const [iduser, setIduser] = useState('');
    // const [idpet, setIdpet] = useState('');
    const [nomeservice, setNomeservice] = useState('');
    const [tipo, setTipo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [valor, setValor] = useState('');
    const [imagemservice, setImagemservice] = useState('');

    const { height } = useWindowDimensions();

    const onRegisterPressed = async () => {
        try {
            const authData = await api.post("/service/register", {
                // iduser: iduser,
                // idpet: idpet,
                nomeservice: nomeservice,
                tipo: tipo,
                descricao: descricao,
                valor: valor,
                imagemservice: imagemservice,

            });
            if (authData.status === 200) {
                console.log(authData.data.message)
                alert(authData.data.message)
                navigation.navigate("RegisterPetshop");
            }
            else {
                console.log(authData.data.message)
            }
        }
        catch (e) {
            console.log(e)
        }
    }

    const imagePickerCall = async () => {
        const data = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (data.cancelled) {
            return;
        }

        setImagemservice(data);
        console.log(data);
    }

    return (
        <View style={styles.view}>

            <Image style={styles.imagePet}
                source={{
                    uri: imagemservice
                        ? imagemservice.uri
                        : "https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-image-512.png"
                }}
            />

            <View style={styles.iconcamera}>
                <Ionicons
                    name='camera'
                    size={24}
                    style={{ margin: 20 }}
                    color="#4536E3"
                    onPress={imagePickerCall} />
            </View>

            {/* <TouchableOpacity style={styles.button} onPress={imagePickerCall}>
                <Text style={styles.buttonText}>Escolha uma imagem para seu serviço</Text>
            </TouchableOpacity> */}

            <CustomInput
                placeholder="Nome do Serviço"
                value={nomeservice}
                setValue={setNomeservice}
            />

            <CustomInput
                placeholder="Tipo"
                value={tipo}
                setValue={setTipo}
            />

            <CustomInput
                placeholder="Descrição"
                value={descricao}
                setValue={setDescricao}
            />

            <CustomInput
                placeholder="Valor R$"
                value={valor}
                setValue={setValor}
            />


            <CustomButton text="Cadastrar Serviço" onPress={onRegisterPressed} />
        </View>
    )
};

const styles = StyleSheet.create({
    view: {
        alignItems: 'center',
        padding: 20,
    },
    logo: {
        width: '70%',
        maxWidth: 300,
        maxHeight: 200,
    },
    iconcamera: {
        backgroundColor: "#AFF4D4",
        borderRadius: 50,
    },
    loginText: {
        fontWeight: "bold",
        color: "#6200ee",
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
    },
    imagePet: {
        width: 100,
        height: 100,
        borderRadius: 5,
    },
    button: {
        width: 250,
        height: 50,
        borderRadius: 5,
        backgroundColor: "#AFF4D4",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 5
    },
    buttonText: {

        color: '#4536E3'
    },

});

export default RegisterService
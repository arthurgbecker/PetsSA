import { StyleSheet, View, Image, useWindowDimensions, Picker, TouchableOpacity, Text } from "react-native";
import React, { useState } from 'react';
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import api from '../api'

import * as ImagePicker from "expo-image-picker";

const RegisterPet = ({ navigation }) => {
    const [imagempet, setImagempet] = useState('');

    const [nome, setNome] = useState('');
    const [especie, setEspecie] = useState('');
    const [raca, setRaca] = useState('');
    const [cor, setCor] = useState('');
    const [sexo, setSexo] = useState('');
    const [peso, setPeso] = useState('');
    const [porte, setPorte] = useState('');
    const [nascimento, setNascimento] = useState('');
    const [castrado, setCastrado] = useState('');
    const [alergia, setAlergia] = useState('');
    const [perfume, setPerfume] = useState('');
    const [agressivo, setAgressivo] = useState('');
    const [observacao, setObservacao] = useState('');

    
    const { height } = useWindowDimensions();

    const onRegisterPressed = async () => {
        try {
            const authData = await api.post("/pet/register", {
                nome: nome,
                especie: especie,
                raca: raca,
                cor: cor,
                sexo: sexo,
                peso: peso,
                porte: porte,
                nascimento: nascimento,
                castrado: castrado,
                alergia: alergia,
                perfume: perfume,
                agressivo: agressivo,
                observacao: observacao,
                imagempet: imagempet
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
    
        setImagempet(data);
        console.log(data);
    }

    return (
        <View style={styles.view}>
            
            <Image style={styles.imagePet}
                source={{
                uri: imagempet
                    ? imagempet.uri
                    : "https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-ios7-contact-outline-512.png"
                }}
            />

            <TouchableOpacity style={styles.button} onPress={imagePickerCall}>
                <Text style={styles.buttonText}>Escolha uma imagem do seu Pet</Text>
            </TouchableOpacity>

            <CustomInput
                placeholder="Nome do Pet"
                value={nome}
                setValue={setNome}
            />

            <Picker
                selectedValue={especie}
                style={styles.picker}
                onValueChange={setEspecie}
                
            >
                <Picker.Item label="Espécie" value=""/>
                <Picker.Item label="Cachorro" value="Cachorro" />
                <Picker.Item label="Gato" value="Gato" />
                
            </Picker>
            
            <Picker
                selectedValue={raca}
                style={styles.picker}
                onValueChange={setRaca}
            >
                <Picker.Item label="Raça" value="" />
                <Picker.Item label="Vira-lata" value="Vira-lata" />
                <Picker.Item label="Golden" value="Golden" />
                <Picker.Item label="Husky" value="Husky" />
                <Picker.Item label="Pit bull" value="Pit bull" />
                <Picker.Item label="Poodle" value="Poodle" />
                <Picker.Item label="Pinscher" value="Pinscher" />
                
            </Picker>

            <Picker
                selectedValue={cor}
                style={styles.picker}
                onValueChange={setCor}
            >
                <Picker.Item label="Cor" value="" />
                <Picker.Item label="Branco" value="Branco" />
                <Picker.Item label="Preto" value="Preto" />
                <Picker.Item label="Cinza" value="Cinza" />
                <Picker.Item label="Amarelo" value="Amarelo" />
                <Picker.Item label="Chocolate" value="Chocolate" />
                <Picker.Item label="Caramelo" value="Caramelo" />
                <Picker.Item label="Marrom" value="Marrom" />
                <Picker.Item label="Malhado" value="Malhado" />
               
            </Picker>

            <Picker
                selectedValue={sexo}
                style={styles.picker}
                onValueChange={setSexo}
            >
                <Picker.Item label="Sexo" value="" />
                <Picker.Item label="Macho" value="Macho" />
                <Picker.Item label="Fêmea" value="Fêmea" />
                
            </Picker>

            <CustomInput
                placeholder="Peso em Kg"
                value={peso}
                setValue={setPeso}
            />

            <Picker
                selectedValue={porte}
                style={styles.picker}
                onValueChange={setPorte}
            >
                <Picker.Item label="Porte" value="" />
                <Picker.Item label="Pequeno" value="Pequeno" />
                <Picker.Item label="Médio" value="Médio" />
                <Picker.Item label="Grande" value="Grande" />
                
            </Picker>

            <CustomInput
                placeholder="Data de Nascimento"
                value={nascimento}
                setValue={setNascimento}
            />

            <Picker
                selectedValue={castrado}
                style={styles.picker}
                onValueChange={setCastrado}
            >
                <Picker.Item label="Castrado?" value="" />
                <Picker.Item label="Sim" value="Sim" />
                <Picker.Item label="Não" value="Não" />
                
            </Picker>

            <CustomInput
                placeholder="Possui alergias? Qual?"
                value={alergia}
                setValue={setAlergia}
            />

            <Picker
                selectedValue={perfume}
                style={styles.picker}
                onValueChange={setPerfume}
            >
                <Picker.Item label="Pode colocar perfume?" value="" />
                <Picker.Item label="Sim" value="Sim" />
                <Picker.Item label="Não" value="Não" />
                
            </Picker>

            <Picker
                selectedValue={agressivo}
                style={styles.picker}
                onValueChange={setAgressivo}
            >
                <Picker.Item label="É agressivo?" value="" />
                <Picker.Item label="Sim" value="Sim" />
                <Picker.Item label="Não" value="Não" />
                
            </Picker>

            <CustomInput
                placeholder="Observação"
                value={observacao}
                setValue={setObservacao}
            />

            <CustomButton text="Register" onPress={onRegisterPressed} />
        </View>
    )
};

const styles = StyleSheet.create({
    view: {
        alignItems: 'center',
        padding: 20,
        flex: 1
    },
    logo: {
        width: '70%',
        maxWidth: 300,
        maxHeight: 200,
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
        borderRadius: 50
    },
    button: {
        width: 250,
        height: 50,
        borderRadius: 3,
        backgroundColor: "#7159c1",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20
    },
    buttonText: {
        color: "#fff"
    },
});

export default RegisterPet
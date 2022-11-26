import { StyleSheet, Text, View, Image, useWindowDimensions, TouchableOpacity, Picker } from "react-native";
import React, { useState, useEffect, useContext } from 'react';
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import api from '../api'
import { Context } from "../context/authContext";


const RegisterAgendamento = ({ navigation }) => {
    const [idservice, setIdservice] = useState(''); // BUSCAR INFO A PARTIR DE OBJETO NA PÁGINA
    const [datetime, setDatetime] = useState(''); // BUSCAR INFO A PARTIR DE CALENDÁRIO NA PÁGINA
    const [chosenpet, setChosenpet] = useState('');
    const [pets, setPets] = useState({});
    const { state, dispatch } = useContext(Context)
    const { height } = useWindowDimensions();
    const [petname1, setPetname1] = useState(null);
    const [petname2, setPetname2] = useState(null);
    
    useEffect(() => {
        const onScreenLoad = async () => {
            const list = await api.get('/pet/find');
            setPets(list.data.pets);
            dispatch({type: "update", payload: false})
            // console.log(list)

            setPetname1(list.data.pets[0].nome);
            setPetname2(list.data.pets[1].nome);
            
        }
        onScreenLoad();
    }, [state.update]
    )   

    const onRegisterPressed = async () => {
        try {
            const data = await api.post('/agendamento/register', {
                idservice: idservice,
                datetime: datetime
            });
            if (data.status === 200) {
                console.log(data)
                alert(data.data.message)
                navigation.navigate('Agendamento')
            } else {
                console.log(data)
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <View style={styles.view}>

            <CustomInput
                value={idservice}
                setValue={setIdservice}
            />

            <CustomInput
                placeholder="Data e Hora"
                value={datetime}
                setValue={setDatetime}
            />

            <Picker
                selectedValue={chosenpet}
                style={styles.picker}
                onValueChange={setChosenpet}
                placeholder="Selecione o pet"
            >
                <Picker.Item label={'Selecione o Pet'} value="true" />
                <Picker.Item label={petname1} value="false" />
                <Picker.Item label={petname2} value="false" />
            </Picker>
            
            <CustomButton text="Salvar" onPress={onRegisterPressed} />
            
            <TouchableOpacity 
                onPress={() => navigation.navigate("Agendamento")}>
    
            </TouchableOpacity>
        </View>
    )
};

const styles = StyleSheet.create({
    view: {
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#9F94FC',
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

export default RegisterAgendamento;
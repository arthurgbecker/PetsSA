import { Button, SafeAreaView, StyleSheet, Text, FlatList, View, Image, useWindowDimensions, TouchableOpacity } from "react-native";
import React, { useState, useEffect, useContext } from 'react';
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import { Context } from "../context/authContext";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from '@react-native-community/datetimepicker';
import api from '../api'

const RegisterAgendamento = ({ navigation }) => {
    const [idservice, setIdservice] = useState(''); // BUSCAR INFO A PARTIR DE OBJETO NA PÁGINA
    const [datetime, setDatetime] = useState(''); // BUSCAR INFO A PARTIR DE CALENDÁRIO NA PÁGINA
    const [chosenpet, setChosenpet] = useState('');
    const [pets, setPets] = useState({});
    const { state, dispatch } = useContext(Context)
    const { height } = useWindowDimensions();
    const [petname1, setPetname1] = useState(null);
    const [petname2, setPetname2] = useState(null);
    
    const [datePicker, setDatePicker] = useState(false);
    const [date, setDate] = useState(new Date());
    const [timePicker, setTimePicker] = useState(false);
    const [time, setTime] = useState(new Date(Date.now()));
    
    function showDatePicker() {
        setDatePicker(true);
    };
     
    function showTimePicker() {
        setTimePicker(true);
    };
     
    function onDateSelected(event, value) {
        setDate(value);
        setDatePicker(false);
    };
     
    function onTimeSelected(event, value) {
        setTime(value);
        setTimePicker(false);
    };

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

            {datePicker && (
                <DateTimePicker
                    value={date}
                    mode={'date'}
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    is24Hour={true}
                    onChange={onDateSelected}
        
                />
            )}
 
            {timePicker && (
                <DateTimePicker
                    value={time}
                    mode={'time'}
                    display={Platform.OS === 'ios' ? 'inline' : 'inline'}
                    is24Hour={false}
                    onChange={onTimeSelected}
                />
            )}

            {!datePicker && (
                <View style={{ margin: 10 }}>
                    <Button title="Selecione a Data" color="#4536E3" onPress={showDatePicker} />
                </View>
            )}
 
            {!timePicker && (
                <View style={{ margin: 10 }}>
                    <Button title="Selecione a Hora" color="#4536E3" onPress={showTimePicker} />
                </View>
            )}
            
            <Text>Data: {date.toDateString()}</Text>
            <Text>Horário: {time.toLocaleTimeString('pt-BR')}</Text>

            {/* <CustomInput
                placeholder="Data e Hora"
                value={datetime}
                setValue={setDatetime}
            /> */}

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
            
            <CustomButton text="Finalizar Agendamento" onPress={onRegisterPressed} />
            
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
        marginVertical: 15,
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
    Button: {
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
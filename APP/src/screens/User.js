import { StyleSheet, View, ScrollView, Text, Image, useWindowDimensions, TouchableOpacity } from "react-native";
import React, { useContext, useState, useEffect } from 'react'
import { Context } from '../context/authContext'
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import api from '../api'
import { Ionicons } from '@expo/vector-icons'

const User = ({ navigation }) => {

    const { state, dispatch } = useContext(Context);

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [nascimento, setNascimento] = useState('');
    const [telefone, setTelefone] = useState('');
    const [cep, setCep] = useState('');
    const [numcasa, setNumcasa] = useState('');
    const [password, setPassword] = useState('');
    const [confirmepassword, setConfirmepassword] = useState('');
    const [admin, setAdmin] = useState(false);

    const { height } = useWindowDimensions();
    useEffect(() => {
        const onScreenLoad = async () => {
            const list = await api.get('/user/find', {
                params: {
                    idUser: state.idUser,
                }
            });

            const user = list.data.user
            dispatch({ type: "update", payload: false })
            setNome(user.nome)
            setEmail(user.email)
            setNascimento(user.nascimento)
            setTelefone(user.telefone)
            setCep(user.cep)
            setNumcasa(user.numcasa)
        }
        onScreenLoad();
    }, [state.update]
    )

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
                confirmepassword: confirmepassword
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

    const deleteUser = async () => {
        try {
            const data = await api.post('/user/delete', {
                idUser: state.idUser
            });
            if (data.status === 200) {
                alert(data.data.message)
                dispatch({ type: "logOut" })
            } else {
                console.log(data)
            }
        } catch (err) {
            console.log(err);
        }
    }


    return (
        <ScrollView style={styles.view}>
            <Text style={styles.perfil}>Meu Perfil</Text>

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
                placeholder="N?? da Casa"
                value={numcasa}
                setValue={setNumcasa}
            />

            <CustomInput
                placeholder="Altere sua senha"
                value={password}
                setValue={setPassword}
                secureTextEntry={true}
            />

            <CustomInput
                placeholder="Confirme sua senha nova"
                value={confirmepassword}
                setValue={setConfirmepassword}
            />

            <CustomButton text="Salvar Altera????es" onPress={onRegisterPressed} />
            {/* <CustomButton text="Deleter Usu??rio" onPress={deleteUser} /> */}
            <View style={styles.trash}>
                <Ionicons
                    name='trash'
                    size={24}
                    style={{ margin: 20 }}
                    color="#4536E3"
                    onPress={() => deletePet(item)} />
            </View>
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    view: {
        padding: 20,
        // backgroundColor: '#9F94FC'
    },
    perfil: {
        fontSize: 25,
        margin: 10,
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
    },
    trash: {
        flex: 1,
        justifyContent: 'space-between',
        flexDirection: 'row-reverse',

    }
});

export default User;
import { StyleSheet, View, ScrollView, Text, FlatList, useWindowDimensions, TouchableOpacity, Picker } from "react-native";
import React, { useContext, useState, useEffect } from 'react'
import { Context } from '../context/authContext'
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import api from '../api'
import { Ionicons } from '@expo/vector-icons'
import { Searchbar } from 'react-native-paper';


const UserAdmin = () => {

  const { state, dispatch } = useContext(Context);
  const [user, setUser] = useState({})

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
      setUser(list.data.user)
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

  const seeReview = async (item) => {
    await dispatch({ type: 'setUser', payload: item.id });
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

      <Text style={styles.perfil}>Buscar Clientes</Text>

      <Searchbar style={styles.searchbar}
        placeholder="Buscar"
        onPress={() => alert("onPress")}
        onChangeText={(text) => console.log(text)}
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

      <FlatList
        data={user}
        renderItem={({ item }) => {
          return (
            <View style={styles.container}>

              <TouchableOpacity style={styles.text} onPress={() => seeReview(item)}>
                <Text style={styles.title}>{item.nome}</Text>

              </TouchableOpacity>
            </View>
          )
        }}
        keyExtractor={(item) => item.id}
      />


    </ScrollView>
  )
}

const styles = StyleSheet.create({
  view: {
    padding: 20,
    backgroundColor: '#9F94FC'
  },
  perfil: {
    fontSize: 25,
    margin: 10,
  },
  searchbar: {
    marginBottom: 30,
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

  },
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: '98%',
    backgroundColor: '#9F94FC',
    margin: 5,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',

  },
  text: {
    height: 65,
    width: '50%',
    justifyContent: "center",
  },
  title: {
    fontSize: 18,
    margin: 3,
  },
});


export default UserAdmin;
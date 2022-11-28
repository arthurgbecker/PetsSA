import { View, Text, StyleSheet, Button, FlatList, TouchableOpacity, Image, useWindowDimensions, ScrollView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../context/authContext'
import api from '../api';
import CustomButton from '../components/CustomButton';
import CustomInput from "../components/CustomInput";
import { Ionicons } from '@expo/vector-icons'
import { Picker } from "@react-native-picker/picker";

const Visualizarpet = ({ navigation }) => {
  const { state, dispatch } = useContext(Context);

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
  useEffect(() => {
    const onScreenLoad = async () => {
      const list = await api.get('/pet/findPet', {
        params: {
          idPet: state.idPet,
        }
      });
      const pet = list.data.pets
      dispatch({ type: "update", payload: false })
      setNome(pet[0].nome)
      setEspecie(pet[0].especie)
      setRaca(pet[0].raca)
      setCor(pet[0].cor)
      setSexo(pet[0].sexo)
      setPeso(pet[0].peso)
      setPorte(pet[0].porte)
      setNascimento(pet[0].nascimento)
      setCastrado(pet[0].castrado)
      setAlergia(pet[0].alergia)
      setPerfume(pet[0].perfume)
      setAgressivo(pet[0].agressivo)
      setObservacao(pet[0].observacao)
    }
    onScreenLoad()
  }, [state.update])

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

  return (
    <ScrollView style={styles.view}>
      <View style={styles.viewimagem}>
        <Image style={styles.imagePet}
          source={{
            uri: "https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-ios7-contact-outline-512.png"
          }}
        />
      </View>
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
        <Picker.Item label="Espécie" value="" />
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

      <CustomButton text="Salvar Alterações" onPress={onRegisterPressed} />

    </ScrollView>
  )
}

const styles = StyleSheet.create({
  view: {
    padding: 20,
    flex: 1

  },
  viewimagem: {
    alignItems: 'center'
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
    borderRadius: 50,
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

export default Visualizarpet;
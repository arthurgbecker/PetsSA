import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../context/authContext'
import CustomButton from '../components/CustomButton'
import { Ionicons } from '@expo/vector-icons'
import api from '../api';

const Agendamento = ({ navigation }) => {
  const { state, dispatch } = useContext(Context);
  const [agendamentos, setAgendamentos] = useState({})

  useEffect(() => {
    const onScreenLoad = async () => {
      const list = await api.get('/agendamento/find')
      setAgendamentos(list.data.agendamentos)
      dispatch({ type: "update", payload: false })
    }
    onScreenLoad()
  }, [state.update])

  const deleteAgendamento = async (item) => {
    try {
      const data = await api.post('/agendamento/delete', {
        id: item.id
      });
      if (data.status === 200) {
        alert(data.data.message)
        dispatch({ type: "update", payload: false }) // atualiza
      } else {
        console.log(data)
      }
    } catch (err) {
      console.log(err);
    }
  }

  // const seeReview = async (item) => {
  //   await dispatch({ type: 'setAgendamento', payload: item.id });
  //   navigation.navigate('Agendamento');
  // }

  const newReview = async (item) => {
    await dispatch({ type: 'setAgendamento', payload: item.id });
    navigation.navigate('Agendamento')
  }

  return (
    <View style={styles.view}>
      <Text style={styles.textnome}>Olá, {state.nome}</Text>

      <Text style={styles.textservice}>Agendamentos</Text>

      <FlatList
        data={agendamentos}
        renderItem={({ item }) => {
          return (
            <View style={styles.container}>

              <TouchableOpacity style={styles.text}>

                <View style={styles.body}>

                  <View style={styles.dadosservice}>
                    <Text style={styles.title}>{item.nomeagendamento}</Text>
                    <Text style={styles.item}>Pet: {item.nomepet}</Text>
                    <Text style={styles.item}>Quando? {item.date}</Text>
                  </View>
                  <View style={styles.trash}>
                    <Ionicons
                      name='trash'
                      size={24}
                      style={{ margin: 20 }}
                      color="#4536E3"
                      onPress={() => deleteAgendamento(item)} />
                  </View>
                </View>
              </TouchableOpacity>
            </View >
          )
        }}
        keyExtractor={(item) => item.id}
      />
    </View >
  )
}

const styles = StyleSheet.create({
  textservice: {
    fontSize: 25,
    margin: 10,
  },
  textnome: {
    fontSize: 20,
    margin: 10
  },
  items: {
    fontSize: 20,
    margin: 10
  },
  view: {
    flex: 1,
    justifyContent: "center",
  },
  container: {
    flexDirection: "column",
    flexWrap: "wrap",
    width: '95%',
    margin: 5,
    padding: 10,
    paddingLeft: 16,
    borderRadius: 10,
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: '#AFF4D4',
  },
  text: {
    height: 100,
    width: '100%',
    justifyContent: "center",
  },
  title: {
    fontSize: 21,
    margin: 3,
  },
  item: {
    fontSize: 13,
    margin: 3,
  },
  iconbutton: {
    margin: 5,
    padding: 8,
    borderRadius: 10,
  },
  imagePet: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  body: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    //backgroundColor: 'blue'
  },
  trash: {
    alignItems: 'center',
    flexDirection: 'row',
    //backgroundColor: 'red'
  },
})

export default Agendamento;
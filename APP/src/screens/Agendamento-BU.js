import { View, Text, StyleSheet, Button, FlatList, TouchableOpacity, Image } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../context/authContext'
import CustomButton from '../components/CustomButton'
import { Ionicons  } from '@expo/vector-icons'
import api from '../api';

import DateTime from './DateTime.js'

const Agendamento = ({navigation}) => {
  const { state, dispatch } = useContext(Context);
  const [ services, setServices ] = useState({})

  useEffect(() => {
    const onScreenLoad = async () => {
      const list = await api.get('/service/find')
      setServices(list.data.services)
      dispatch({type: "update", payload: false})
      console.log(list);
    }
    onScreenLoad()
  }, [state.update])

  // const seeService = async (item) => {
  //   await dispatch({type: 'setService', payload: item});
  //   navigation.navigate('Visualizaservice');
  // }

  // const newService = async (item) => {
  //   await dispatch({type: 'setService', payload: item});
  //   navigation.navigate('Visualizaservice')
  // }

  return (
    <View style={styles.view}>
      <Text style={styles.textservice}>Serviço</Text>
      
      <FlatList
        data={services}
        renderItem={({ item }) => {
          return (
            <View style={styles.container}>

                <Image style={styles.imagePet}
                    source={{
                    uri: "https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-image-512.png"
                    }}
                />

                <Text style={styles.title}>{item.nomeservice}</Text>              
                <Text style={styles.item}>{item.descricao}</Text>
                <Text style={styles.item}>Valor: R${item.valor}</Text>
             
            </View>
          )
        }}
        keyExtractor={(item) => item.id}
      />

      {/* <DateTime /> */}

    </View>
  )
}

const styles = StyleSheet.create({
  textservice: {
    fontSize: 20,
    margin: 10,
  },
  items: {
    fontSize: 18,
    margin: 10
  },
  view: {
    flex: 1,
    justifyContent: "center"
   
  },
  container: {
    margin: 5,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    width: '80%',
    justifyContent: "center",
  },
  text: {
    height: 65,
    width: '50%',
    justifyContent: "center",
  },
  title: {
    fontSize: 25,
    padding: 10
  },
  item: {
    fontSize: 15,
    margin: 3,
  },
  imagePet: {
    width: 100,
    height: 100,
    borderRadius: 10,
  }
})

export default Agendamento;

import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../context/authContext'
import CustomButton from '../components/CustomButton'
import { Ionicons  } from '@expo/vector-icons'
import api from '../api';

const Home = ({navigation}) => {
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

  const seeReview = async (item) => {
    await dispatch({type: 'setService', payload: item});
    navigation.navigate('Visualizaservice');
  }

  const newReview = async (item) => {
    await dispatch({type: 'setService', payload: item});
    navigation.navigate('Visualizaservice')
  }

  return (
    <View style={styles.view}>
      <Text style={styles.text}>Olá, {state.nome}</Text>
      <Text style={styles.textservice}>Lista de Serviços</Text>
      
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

              <TouchableOpacity style={styles.text} onPress={() => seeReview(item)}>
              <Text style={styles.title}>{item.nomeservice}</Text>
                <Text style={styles.item}>Descrição: {item.tipo}</Text>
                <Text style={styles.item}>Valor: R${item.valor}</Text>
                <Text style={styles.item}>Ver detalhes</Text>
              </TouchableOpacity>
            </View>
          )
        }}
        keyExtractor={(item) => item.id}
      />
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
  item: {
    fontSize: 12,
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
  }
})

export default Home;
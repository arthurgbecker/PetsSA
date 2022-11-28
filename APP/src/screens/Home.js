import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../context/authContext'
import CustomButton from '../components/CustomButton'
import { Ionicons } from '@expo/vector-icons'
import api from '../api';

const Home = ({ navigation }) => {
  const { state, dispatch } = useContext(Context);
  const [services, setServices] = useState({})

  useEffect(() => {
    const onScreenLoad = async () => {
      const list = await api.get('/service/find')
      setServices(list.data.services)
      dispatch({ type: "update", payload: false })
    }
    onScreenLoad()
  }, [state.update])

  const deleteService = async (item) => {
    try {
      const data = await api.post('/service/delete', {
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

  const seeReview = async (item) => {
    await dispatch({ type: 'setService', payload: item.id });
    navigation.navigate('VisualizaService2');
  }

  const newReview = async (item) => {
    await dispatch({ type: 'setService', payload: item.id });
    navigation.navigate('VisualizaService2')
  }

  return (
    <View style={styles.view}>
      <Text style={styles.textnome}>Olá, {state.nome}</Text>

      <Text style={styles.textservice}>Serviços</Text>

      <FlatList
        data={services}
        renderItem={({ item }) => {
          return (
            <View style={styles.container}>

              <TouchableOpacity style={styles.text} onPress={() => seeReview(item)}>

                <View style={styles.body}>

                  <Image style={styles.imagePet}
                    source={{
                      uri: "https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-image-512.png"
                    }}
                  />
                  <View style={styles.dadosservice}>
                    <Text style={styles.title}>{item.nomeservice}</Text>
                    <Text style={styles.item}>Descrição: {item.tipo}</Text>
                    <Text style={styles.item}>Valor: R${item.valor}</Text>
                    <Text style={styles.item}>Ver detalhes &rarr;</Text>
                  </View>
                  <View style={styles.trash}>
                    <Ionicons
                      name='trash'
                      size={24}
                      style={{ margin: 20 }}
                      color="#4536E3"
                      onPress={() => deleteService(item)} />
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
    justifyContent: "center"

  },
  container: {
    flexDirection: "column",
    flexWrap: "wrap",
    width: '95%',
    margin: 5,
    padding: 10,
    paddingLeft: 15,
    borderRadius: 10,
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: '#9F94FC',
  },
  text: {
    height: 100,
    width: '100%',
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
  },
  dadosservice: {
 
    
  },
  body: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    //backgroundColor: 'blue'
  },
  trash: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    //backgroundColor: 'red'
  },
})

export default Home;
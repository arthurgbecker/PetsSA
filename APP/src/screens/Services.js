import { View, Text, StyleSheet, Button, FlatList, TouchableOpacity, Image } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../context/authContext'
import api from '../api';
import CustomButton from '../components/CustomButton';
import { Ionicons  } from '@expo/vector-icons'

const Services = ({navigation}) => {
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
    await dispatch({type: 'setService', payload: item.id});
    navigation.navigate('Home');
  }

  const newReview = async (item) => {
    await dispatch({type: 'setService', payload: item});
    navigation.navigate('VisualizaService')
  }

  const deleteService = async (item) => {
    try {
        const data = await api.post('/service/delete', {
            id: item.id
        });
        if (data.status === 200) {
            alert(data.data.message)
            dispatch({type: "update", payload: false}) // atualiza
        } else {
            console.log(data)
        }
    } catch (err) {
        console.log(err);
    }
  }
  return (
    <View style={styles.view}>
      <Text style={styles.textservice}>Lista de Serviços</Text>
     
      <FlatList
        data={services}
        renderItem={({ item }) => {
          return (
            <View style={styles.container}>

                <Image style={styles.imagePet}
                    source={{
                    uri: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"
                    }}
                />

              <TouchableOpacity style={styles.text}>
                <Text style={styles.item}>Nome do Serviço - {item.nomeservice}</Text>
                <Text style={styles.item}>Descrição - {item.descricao}</Text>
                <Text style={styles.item}>Valor - R${item.valor}</Text>

                <Ionicons.Button style={styles.delete}
                  name="trash" 
                  backgroundColor="#4536E3" 
                  color='#9F94FC'
                  onPress={() => deleteService(item)}>
                </Ionicons.Button>
              </TouchableOpacity>
            </View>
          )
        }}
        keyExtractor={(item) => item.id}
      />

      {/* {state.isAdmin ? (
        <></>
      ) : (
        <Ionicons.Button style={styles.iconbutton}
          name="add-circle" 
          backgroundColor="#AFF4D4" 
          color='#4536E3'
          onPress={() => navigation.navigate("RegisterPet")}>
            Cadastrar Pet
        </Ionicons.Button>

      )} */}
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
    justifyContent: "center",
   
  },
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: '80%',
    backgroundColor: '#9F94FC',
    margin: 5,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  
  },
  text: {
    height: 65,
    width: '80%',
    justifyContent: "center",
  },
  title: {
    fontSize: 25,
    padding: 10
  },
  item: {
    fontSize: 15,
    marginLeft: 25,
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
  delete: {
    flex: 1,
    height: 30,
    width: 30,
    margin: 5,
    padding: 5,
    borderRadius: 5,
  },
})

export default Services;

import { View, Text, StyleSheet, Button, FlatList, TouchableOpacity, Image } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../context/authContext'
import api from '../api';
import CustomButton from '../components/CustomButton';
import { Ionicons  } from '@expo/vector-icons'

import DateTime from "./DateTime";

const Agendamento = ({navigation}) => {
  const { state, dispatch } = useContext(Context);
  const [ pets, setPets ] = useState({})

  useEffect(() => {
    const onScreenLoad = async () => {
      const list = await api.get('/pet/find')
      setPets(list.data.pets)
      dispatch({type: "update", payload: false})
      console.log(list);
    }
    onScreenLoad()
  }, [state.update])

  const seeReview = async (item) => {
    await dispatch({type: 'setPet', payload: item});
    navigation.navigate('RestaurantReviews');
  }

  const newReview = async (item) => {
    await dispatch({type: 'setPet', payload: item});
    navigation.navigate('RegisterReview')
  }

  return (
    <View style={styles.view}>
      <Text style={styles.textpet}>Agendamento</Text>
      
      {state.isAdmin ? (
        <></>
      ) : (
        <></>
      )}
       <FlatList
          data={pets}
          renderItem={({ item }) => {
          return (
            <View style={styles.container}>
            
            </View>
          )
        }}
        keyExtractor={(item) => item.id}
      />

      <DateTime />

    </View>
  )
}

const styles = StyleSheet.create({
  textpet: {
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
    //flexDirection: "row",
    //flexWrap: "wrap",
    margin: 5,
    padding: 10,
    borderRadius: 10,
    //backgroundColor: '#9F94FC',
    alignItems: 'center',
    //height: 65,
    width: '80%',
    justifyContent: "center",
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
    fontSize: 15
  },
  iconbutton: {
   
  },
  imagePet: {
    width: 100,
    height: 100,
    borderRadius: 50
  }
})

export default Agendamento;

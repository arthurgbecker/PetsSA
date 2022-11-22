import { View, Text, StyleSheet, Button, FlatList, TouchableOpacity, Image } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../context/authContext'
import api from '../api';
import CustomButton from '../components/CustomButton';
import { Ionicons  } from '@expo/vector-icons'

const Visualizarpet = ({navigation}) => {
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
      <Text style={styles.textpet}>Seu Pet</Text>
      
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
              
              <Image style={styles.imagePet}
                    source={{
                    uri: "https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-ios7-contact-outline-512.png"
                    }}
                />
              
                <Text style={styles.title}>{item.nome}</Text>
                <Text style={styles.item}>Espécie - {item.especie}</Text>
                <Text style={styles.item}>Raça - {item.raca}</Text>
                <Text style={styles.item}>Cor - {item.cor}</Text>
                <Text style={styles.item}>Sexo - {item.sexo}</Text>
                <Text style={styles.item}>Peso em Kg - {item.peso}</Text>
                <Text style={styles.item}>Porte - {item.porte}</Text>
                <Text style={styles.item}>Nascimento - {item.nascimento}</Text>
                <Text style={styles.item}>Castrado? - {item.castrado}</Text>
                <Text style={styles.item}>Alergias? - {item.alergia}</Text>
                <Text style={styles.item}>Perfume? - {item.perfume}</Text>
                <Text style={styles.item}>Agressivo? - {item.agressivo}</Text>
                <Text style={styles.item}>OBS: {item.observacao}</Text>
                
            </View>
          )
        }}
        keyExtractor={(item) => item.id}
      />
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

export default Visualizarpet;
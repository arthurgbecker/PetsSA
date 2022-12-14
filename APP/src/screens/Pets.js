import { View, Text, StyleSheet, Button, FlatList, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../context/authContext'
import api from '../api';
import CustomButton from '../components/CustomButton';
import { Ionicons } from '@expo/vector-icons'

const Pets = ({ navigation }) => {
  const { state, dispatch } = useContext(Context);
  const [pets, setPets] = useState({})

  useEffect(() => {
    const onScreenLoad = async () => {
      const list = await api.get('/pet/find')
      setPets(list.data.pets)
      dispatch({ type: "update", payload: false })
      console.log(list);
    }
    onScreenLoad()
  }, [state.update])

  const seeReview = async (item) => {
    await dispatch({ type: 'setPet', payload: item });
    navigation.navigate('Visualizarpet');
  }

  const newReview = async (item) => {
    await dispatch({ type: 'setPet', payload: item });
    navigation.navigate('Visualizarpet')
  }

  const deletePet = async (item) => {
    try {
      const data = await api.post('/pet/delete', {
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


  return (
    <View style={styles.view}>
      <Text style={styles.textpet}>Meus Pets</Text>

      <FlatList
        data={pets}
        renderItem={({ item }) => {
          return (
            <View style={styles.container}>
              <TouchableOpacity style={styles.text} onPress={() => seeReview(item)}>

                <View style={styles.body}>
                  <View style={styles.dadosPet}>
                    <Text style={styles.title}>{item.nome}</Text>
                  </View>
                  <View style={styles.trash}>
                    <Ionicons
                      name='trash'
                      size={24}
                      style={{ margin: 20 }}
                      color="#4536E3"
                      onPress={() => deletePet(item)} />
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          )
        }}
        keyExtractor={(item) => item.id}
      />
      <View style={styles.botoes}>
        {state.isAdmin ? (
          <></>
        ) : (
          <View style={styles.botoes}>
            <Ionicons.Button style={styles.iconbutton}
              name="add-circle"
              backgroundColor="#AFF4D4"
              color='#4536E3'
              onPress={() => navigation.navigate("RegisterPet")}>
              Cadastrar Pet
            </Ionicons.Button>
          </View>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  textpet: {
    fontSize: 25,
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
    margin: 5,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#9F94FC',
    alignItems: 'center',

  },
  text: {
    height: 65,
    width: '100%',
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
    margin: 5,
    padding: 8,
    borderRadius: 10,
  },
  delete: {
    margin: 5,
    padding: 5,
    borderRadius: 5,

  },
  trash: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  dadosPet: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  body: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  botoes: {
    margin: 10,
    flexDirection: 'column-reverse',
    flex: 3,
    alignItems: 'center',
  },
})

export default Pets;

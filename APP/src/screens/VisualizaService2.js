import { SafeAreaView, View, Text, StyleSheet, Button, FlatList, useWindowDimensions, TouchableOpacity, Image } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../context/authContext'
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import { Ionicons } from '@expo/vector-icons'
import api from '../api';
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from '@react-native-community/datetimepicker';

const VisualizaService2 = ({ navigation }) => {
    const { state, dispatch } = useContext(Context);
    const [services, setServices] = useState({})
    const [idservice, setIdservice] = useState('');
    const { height } = useWindowDimensions();
      
    const [pets, setPets] = useState({});
    
    const [petname1, setPetname1] = useState(null);
    const [petname2, setPetname2] = useState(null);
    const [chosenpet, setChosenpet] = useState('');
    
    const [datePicker, setDatePicker] = useState(false);
    const [date, setDate] = useState(new Date());
    const [timePicker, setTimePicker] = useState(false);
    const [time, setTime] = useState(new Date(Date.now()));

    function showDatePicker() {
        setDatePicker(true);
    };
     
    function showTimePicker() {
        setTimePicker(true);
    };
     
    function onDateSelected(event, value) {
        setDate(value);
        setDatePicker(false);
    };
     
    function onTimeSelected(event, value) {
        setTime(value);
        setTimePicker(false);
    };

  useEffect(() => {
    const onScreenLoad = async () => {
        const listservice = await api.get('/service/findService', {
            params: {
            id: state.idService
            }
        })
        setServices(listservice.data.services)
        dispatch({ type: "update", payload: false })
        // console.log(services[0].id)
        // console.log(services[0].nomeservice)
    
        const listpet = await api.get('/pet/find');
        setPets(listpet.data.pets);
        dispatch({type: "update", payload: false})
            setPetname1(listpet.data.pets[0].nome);
            setPetname2(listpet.data.pets[1].nome);
        
    }
    onScreenLoad();
  }, [state.update]
  )


  const seeReview = async (item) => {
    await dispatch({type: 'setService', payload: item});
    navigation.navigate('RestaurantReviews');
  }

  const newReview = async (item) => {
    await dispatch({type: 'setService', payload: item});
    navigation.navigate('RegisterReview')
  }

  const onRegisterPressed = async () => {
        try {
            const data = await api.post('/agendamento/register', {
                idservice: services[0].id,
                nomeagendamento: services[0].nomeservice,
                nomepet: chosenpet,
                date: date,
                time: time,
            });
            if (data.status === 200) {
                console.log(data)
                alert(data.data.message)
                navigation.navigate('Home')
            } else {
                console.log(data)
            }
        } catch (err) {
            console.log(err);
        }
    }

  return (
    <View style={styles.view}>
      <Text style={styles.textservice}>Serviço: </Text>

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
              <Text style={styles.item}>Descrição: {item.descricao}</Text>
              <Text style={styles.item}>Valor: R${item.valor}</Text>

              <View style={styles.viewdatapicker}>

                {!datePicker && (
                    <View style={{ margin: 10, width: 220 }}>
                        <Button title="Selecione a Data" color="#4536E3" onPress={showDatePicker}/>
                    </View>
                )}

                {!timePicker && (
                    <View style={{ margin: 10, width: 220 }}>
                        <Button title="Selecione a Hora" color="#4536E3" onPress={showTimePicker} />
                    </View>
                )}

                {datePicker && (
                    <DateTimePicker
                        value={date}
                        mode={'date'}
                        display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                        is24Hour={true}
                        onChange={onDateSelected}

                    />
                )}

                {timePicker && (
                    <DateTimePicker
                        value={time}
                        mode={'time'}
                        display={Platform.OS === 'ios' ? 'inline' : 'inline'}
                        is24Hour={false}
                        onChange={onTimeSelected}
                    />
                )}

                <Text>Data: {date.toDateString()}</Text>
                <Text>Horário: {time.toLocaleTimeString('pt-BR')}</Text>

{/* {console.log(date)}
{console.log(time)} */}

                <Picker
                    selectedValue={chosenpet}
                    style={styles.picker}
                    onValueChange={setChosenpet}
                    placeholder="Selecione o pet"
                >
                    <Picker.Item label={'Selecione o Pet'} value="false" />
                    <Picker.Item label={petname1} value={petname1} />
                    <Picker.Item label={petname2} value={petname2} />
                </Picker>

{/* {console.log(chosenpet)} */}

                <CustomButton text="Finalizar Agendamento" onPress={onRegisterPressed} />

                <TouchableOpacity 
                    onPress={() => navigation.navigate("Agendamento")}>
                </TouchableOpacity>
                </View>

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
    margin: 10,
    alignItems:"center"
},

  view: {
    flex: 1
  },

viewdatapicker: {
    marginVertical: 13,
    alignItems: 'center',
    width: '90%',
    // backgroundColor: '#9F94FC',
    flex: 1
},

picker: {
    marginVertical: 20,
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
Button: {
    marginVertical: 5,
    borderRadius: 20,
    backgroundColor: 'white',
    textAlignVertical: 'center',
    padding: 15,
    fontSize: '14px',
    fontWeight: 'bold',
    borderWidth: 0,
    height: 50,
    width: '100%'
},

  container: {
    // margin: 5,
    padding: 10,
    // borderRadius: 10,
    alignItems: 'center',
    width: '100%',
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
    alignItems:"center"
  },
  imagePet: {
    width: 100,
    height: 100,
    borderRadius: 10,
  }
})

export default VisualizaService2
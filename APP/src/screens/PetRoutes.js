import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import RegisterPet from './RegisterPet'
import Pets from './Pets'
import Visualizarpet from './VisualizarPet'

const Stack = createNativeStackNavigator()

const PetRoutes = ({navigation}) => {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name='Pets' component={Pets}/>
            <Stack.Screen name='RegisterPet' component={RegisterPet}/>
            <Stack.Screen name='Visualizarpet' component={Visualizarpet}/>
        </Stack.Navigator>
    )
}

export default PetRoutes

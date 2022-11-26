import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import RegisterAgendamento from './RegisterAgendamento'
import Agendamento from './Agendamento'

const Stack = createNativeStackNavigator()

const AgendamentoRoutes = () => {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name='Agendamento' component={Agendamento}/>
            <Stack.Screen name='RegisterAgendamento' component={RegisterAgendamento}/>
        </Stack.Navigator>
    )
}

export default AgendamentoRoutes

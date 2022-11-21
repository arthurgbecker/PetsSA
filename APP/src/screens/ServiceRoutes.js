import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import RegisterService from './RegisterService'
import Services from './Services'
import Home from './Home'
import RegisterPetshop from './RegisterPetshop'
import Visualizaservice from './VisualizaService'

const Stack = createNativeStackNavigator()

const ServiceRoutes = ({navigation}) => {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name='RegisterPetshop' component={RegisterPetshop}/>
            {/* <Stack.Screen name='Services' component={Services}/> */}
            <Stack.Screen name='Home' component={Home}/>
            <Stack.Screen name='RegisterService' component={RegisterService}/>
            <Stack.Screen name='Visualizaservice' component={Visualizaservice}/>

        </Stack.Navigator>
    )
}

export default ServiceRoutes

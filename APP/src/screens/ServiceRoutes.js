import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import RegisterService from './RegisterService'
import Services from './Services'
import Home from './Home'
import RegisterPetshop from './RegisterPetshop'
// import VisualizaService from './VisualizaService'
import VisualizaService2 from './VisualizaService2'

const Stack = createNativeStackNavigator()

const ServiceRoutes = ({navigation}) => {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name='Home' component={Home}/>
            <Stack.Screen name='RegisterPetshop' component={RegisterPetshop}/>
            <Stack.Screen name='Services' component={Services}/>
            {/* <Stack.Screen name='VisualizaService' component={VisualizaService}/> */}
            <Stack.Screen name='VisualizaService2' component={VisualizaService2}/>
            <Stack.Screen name='RegisterService' component={RegisterService}/> 
            {/* <Stack.Screen name='HomeMain' component={Home}/> */}

        </Stack.Navigator>
    )
}

export default ServiceRoutes

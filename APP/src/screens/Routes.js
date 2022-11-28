import { StyleSheet } from 'react-native'
import React, { useContext } from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons'
import { Context } from '../context/authContext'

import Home from './Home';
import VisualizaService from './VisualizaService';
import PetRoutes from './PetRoutes';
import RegisterPetshop from './RegisterPetshop';
import ServiceRoutes from './ServiceRoutes'
import Agendamento from './Agendamento';
import RegisterAgendamento from './RegisterAgendamento';
import User from './User';
import UserAdmin from './UserAdmin';
import DateTime from './DateTime';

const Tab = createBottomTabNavigator()

const Routes = () => {
    const { state, dispatch } = useContext(Context)
    return (
        <Tab.Navigator screenOptions={{
            headerRight: () => (
                <Ionicons
                    name='log-out'
                    size={24}
                    style={{ margin: 20 }}
                    color="#4536E3"
                    onPress={() => dispatch({ type: 'logOut' })}
                />
            )
        }}>
            <Tab.Screen
                name="ServiceRoutes"
                component={ServiceRoutes}
                options={{
                    headerTitle: "Home",
                    tabBarLabel: 'Home',
                    tabBarIcon: () => (<Ionicons name='home' size={24} color='#4536E3' />)
                }}
            />


            {/* <Tab.Screen
                name="Agendamento"
                component={Agendamento}
                options={{
                    tabBarIcon: () => (<Ionicons name='calendar' size={24} color='#4536E3' />)
                }}
            /> */}

            <Tab.Screen
                name="Agendamentos"
                component={Agendamento}
                options={{
                    tabBarIcon: () => (<Ionicons name='calendar' size={24} color='#4536E3' />)
                }}
            />

            {state.isAdmin ? (
                <Tab.Screen
                    name="Petshop"
                    component={RegisterPetshop}
                    options={{
                        tabBarIcon: () => (<Ionicons name='business' size={24} color='#4536E3' />)
                    }}
                />
            ) : (
                <Tab.Screen
                    name="Pets"
                    component={PetRoutes}
                    options={{
                        tabBarIcon: () => (<Ionicons name='paw' size={24} color='#4536E3' />)
                    }}
                />
            )}

            {state.isAdmin ? (
                <Tab.Screen
                    name="Clientes"
                    component={UserAdmin}
                    options={{
                        tabBarIcon: () => (<Ionicons name='person-sharp' size={24} color='#4536E3' />)
                    }}
                />

            ) : (
                <Tab.Screen
                    name="User"
                    component={User}
                    options={{
                        tabBarIcon: () => (<Ionicons name='person-sharp' size={24} color='#4536E3' />)
                    }}
                />
            )}
        </Tab.Navigator>
    )
}

export default Routes

const styles = StyleSheet.create({})

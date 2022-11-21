import { View, Text } from 'react-native'
import React, { useContext, useEffect, useState, Component } from 'react'
import { Context } from '../context/authContext';
import api from '../api'
import { Searchbar } from 'react-native-paper';


const UserAdmin = () => {
  
    const { state, dispatch } = useContext(Context);

  return (
        <View>
            <Searchbar
            placeholder="Search here"
            onPress={() => alert("onPress")}
            onChangeText={(text) => console.log(text)}
            />
        </View>
  )
}

export default UserAdmin;
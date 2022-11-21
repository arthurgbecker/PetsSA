import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { Context } from '../context/dataContext'

const Teste = () => {
    const data = useContext(Context)
    return (
        <View>
            <Text>
                {data}
            </Text>
        </View>
    )
}

export default Teste

const styles = StyleSheet.create({})
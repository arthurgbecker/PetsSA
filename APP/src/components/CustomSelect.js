import {View, Picker, StyleSheet } from 'react-native';
import React from 'react';
 
const CustomSelect = ({ value, setValue, options }) => {
    return (
        <View style={styles.container}>
            <Picker
                selectedValue={value}
                style={styles.input}
                onValueChange={setValue}
            >
                <Picker.Item label="Admin User" value="true" />
                <Picker.Item label="Regular User" value="false" />
            </Picker>
        </View>
    )
}
 
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'lightgray',
        width: '100%',
        marginVertical: 5,
        borderRadius: 5,
    },
    input: {
        backgroundColor: 'lightgray',
        textAlignVertical: 'center',
        textAlign: 'center',
        fontSize: '14px',
        fontWeight: 'bold',
        borderRadius: 5,
        borderWidth: 0,
        height: 45,
        
    }
})
 
export default CustomSelect;
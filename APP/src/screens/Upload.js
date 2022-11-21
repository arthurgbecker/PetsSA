import React, { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet, Image } from "react-native";

import * as ImagePicker from "expo-image-picker";

export default function Upload({ navigation }) {
  const [avatar, setAvatar] = useState();

  const imagePickerCall = async () => {
    const data = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (data.cancelled) {
      return;
    }

    setAvatar(data);
  }

  return (
    <View style={styles.container}>
      
      <Image
        source={{
          uri: avatar
            ? avatar.uri
            : "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"
        }}
        style={styles.avatar}
      />

      <TouchableOpacity style={styles.button} onPress={imagePickerCall}>
        <Text style={styles.buttonText}>Escolha uma imagem do seu Pet</Text>
      </TouchableOpacity>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  button: {
    width: 250,
    height: 50,
    borderRadius: 3,
    backgroundColor: "#7159c1",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20
  },
  buttonText: {
    color: "#fff"
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50
  }
});




// import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
// import React, {useState} from 'react'
// import axios, { Axios } from 'axios'

// import Constants from 'expo-constants'
// import * as Permissions from 'expo-permissions'
// import * as ImagePicker from 'expo-image-picker'

// const Teste = ({ navigation }) => {
//     const [avatar, setAvatar] = useState()

//     async function imagePickerCall (){
//         if (Constants.platform.ios){
//             const {status} =  await Permissions.askAsync(Permissions.CAMERA_ROLL)

//             if (status != 'granted')
//                 alert("Precisa de Permissão")
//                 return
//             }
//         }

//         const data = await ImagePicker.launchImageLibraryAsync({})
        
//         if(data.cancelled){
//             return
//         }

//         if(data.uri){
//             return
//         }

//         setAvatar(data)

//         console.log(data);

//     }

//     async function uploadImage() {
//         const data = new FormData()

//         data.append("avatar", {
//             uri: avatar.uri,
//             type: avatar.type
//         })
        
//         await Axios.post("http://localhost:3000/files", data)
//     }

//     return (
//         <View style={styles.container}>
//             <Image style={styles.avatar}
//                 source={{
//                     uri: avatar
//                     ? avatar.uri
//                     : "https://mltmpgeox6sf.i.optimole.com/w:761/h:720/q:auto/https://redbanksmilesnj.com/wp-content/uploads/2015/11/man-avatar-placeholder.png"
//                 }}
//             />
        
//             <TouchableOpacity style={styles.button}> onPress={imagePickerCall}
//                 <Text style={styles.buttonText}>Escolher imagem</Text>
//             </TouchableOpacity>

//             <TouchableOpacity style={styles.button}> onPress={uploadImage}
//                 <Text style={styles.buttonText}>Enviar imagem</Text>
//             </TouchableOpacity>
//         </View>
//     )
// }

// export default Teste

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: "center",
//         alignItems: "center"
//       },
//       button: {
//         width: 150,
//         height: 50,
//         borderRadius: 3,
//         backgroundColor: "#7159c1",
//         justifyContent: "center",
//         alignItems: "center",
//         marginTop: 20
//       },
//       buttonText: {
//         color: "#fff"
//       },
//       avatar: {
//         width: 100,
//         height: 100,
//         borderRadius: 50
//       }
// })


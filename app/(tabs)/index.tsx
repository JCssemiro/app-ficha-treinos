import {  Button, StyleSheet, TouchableOpacity,Text } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useState } from 'react';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const [usuario,SetUsuario] = useState("Usuário");
  const router = useRouter();

  return (
    <ParallaxScrollView>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type='title' style={{textAlign:"center"}}>Bem-vindo, {usuario}!</ThemedText>
      </ThemedView>
        <ThemedText type='default'>
          Este é um aplicativo teste para entender como funciona o React Native!
        </ThemedText>
        <TouchableOpacity style={styles.button} onPress={()=>{router.push("/ficha")}}>
          <Text style={{color:"#fff",fontSize:20,fontWeight:"bold"}}>Ver minha ficha</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={()=>{router.push("/explore")}}>
          <Text style={{color:"#fff",fontSize:20,fontWeight:"bold"}}>Explorar mais exercícios</Text>
        </TouchableOpacity>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 8,
    marginBottom: 15
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  button:{
    width: '100%',
    backgroundColor:"#ed1539",
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
  }
});

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { View,StyleSheet, useColorScheme, TextInput, Text } from "react-native";
import { useExerciciosContext } from "@/context/context";
import { db } from "@/db";
import { TouchableOpacity } from "react-native";


export default function Ficha(){
    const {minhaLista,removerExercicio} = useExerciciosContext();
    const exerciciosLista = db.exercicios;
    const colorScheme = useColorScheme();

    function handleRemoveButton(id: number) {
        removerExercicio(id)
    }

    return(
        <ParallaxScrollView>
            <ThemedText type="title">Minha Ficha de Treino</ThemedText>
            {minhaLista.map((exercicio)=>(
                <View style={{...styles.listItem,backgroundColor: Colors[colorScheme ?? 'light'].background}} key={exercicio.id}>
                    <ThemedText type='subtitle'>{exerciciosLista.find((el)=>{return el.id === exercicio.exercicioId})?.titulo}</ThemedText>
                    <ThemedText type='default'>{exerciciosLista.find((el)=>{return el.id === exercicio.exercicioId})?.grupo}</ThemedText>
                    <TouchableOpacity style={styles.button} onPress={()=>{handleRemoveButton(exercicio.id)}}>
                        <Text style={{textAlign:'center',fontSize: 16,color:'white',fontWeight:'bold'}}>Remover</Text>
                    </TouchableOpacity>
                </View>
            ))}
        </ParallaxScrollView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1
    },
    list: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        padding: 32,
        gap: 16
      },
      listItem:{
        width: '100%',
        borderWidth: 1,
        padding: 12,
        borderRadius: 15
      },
      button:{
        marginTop:30,
        width: '100%',
        backgroundColor: "#ed1539",
        paddingVertical: 20,
        color: 'white',
        borderRadius: 15,
        textAlign:'center'
      }
})
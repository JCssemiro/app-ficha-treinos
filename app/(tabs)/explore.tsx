
import { GestureResponderEvent, StyleSheet,Text,TextInput,TouchableOpacity,View, useColorScheme } from 'react-native';
import { Colors } from '@/constants/Colors';
import { ThemedText } from '@/components/ThemedText';
import { useState, useEffect } from 'react';
import {ExercicioType} from '../../utils/ExercicioType';
import {db} from '../../db';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ListaItemType } from '@/utils/ListaItemType';
import { adicionarExercicioParaLista } from '@/dbFunctions';
import { useExerciciosContext } from '@/context/context';

export default function TabTwoScreen() {
  const [listaExercicios,setListaExercicios] = useState<ExercicioType[]>([]);
  const [listaBusca,setListaBusca] = useState<ExercicioType[]>([]);
  const {minhaLista,adicionarExercicio} = useExerciciosContext();
  const [busca,setBusca] = useState("");

  const fetchExercicios = ()=>{
    try{
    const data = db.exercicios;
    setListaExercicios(data);
    setListaBusca(data);
    }catch(error){
      console.log(error);
    }
  }

  const handleSearch = (e : string)=>{
    try{
      setBusca(e);
      let listaFiltrada = listaExercicios.filter((exercicio)=>{return exercicio.titulo.toUpperCase().includes(e.toUpperCase())});
      setListaBusca(listaFiltrada);
    }catch(error){
      console.log(error);
    }
  }

  useEffect(()=>{
    fetchExercicios();
  },[]);

  const colorScheme = useColorScheme();

  function handleAddButton(id: number): void {
    const exercicioSelecionado = listaExercicios.find(el => el.id === id);
    if (exercicioSelecionado) {
      const exercicioAdicionado: ListaItemType = {
        id: minhaLista.length > 0 ? minhaLista[minhaLista.length - 1].id + 1 : 0,
        exercicioId: exercicioSelecionado.id,
        series: 0,
        repeticoes: 0,
        pr: 0,
      };
      adicionarExercicio(exercicioAdicionado);
    }
  }

  return (
    <ParallaxScrollView style={styles.container}>
      <View style={styles.headerView}>
        <Text style={styles.title}>
          Explore novos exercícios
        </Text>
        <TextInput style={styles.input} value={busca} onChangeText={handleSearch} placeholder='Buscar exercício'/>
      </View>
      <View style={styles.list}>


        {listaBusca.map((exercicio)=>(
          <View style={{...styles.listItem,backgroundColor: Colors[colorScheme ?? 'light'].background}} key={exercicio.id}>
            <ThemedText type='subtitle'>{exercicio.titulo}</ThemedText>
            <ThemedText type='default' style={{color: '#ed1539',marginBottom:15}}>{exercicio.grupo}</ThemedText>
            <TouchableOpacity style={styles.button} onPress={()=>{handleAddButton(exercicio.id!)}}>
              <Text style={{textAlign:'center',fontSize: 16,color:'white',fontWeight:'bold'}}>Adicionar a lista</Text>
            </TouchableOpacity>
          </View>
        ))}

      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    flex: 1,
    marginTop:50,
    padding:32,
    gap:16,
    alignItems:"center"
  },

  title:{
    paddingTop: 40,
    fontSize:32,
    textAlign:'center',
    fontWeight:'bold',
    color:'white'

  },

  input: {
    backgroundColor: 'white',
    padding:10,
    borderRadius: 10,
    width: '100%',
    marginVertical: 15,
    fontSize: 16,
    textAlign: 'center'
  },
  headerView: {
    justifyContent: "center",
    backgroundColor: '#ed1539',
    width: '100%',
    marginTop: 0,
    padding:32,
    gap: 16,
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
    width: '100%',
    backgroundColor: "#ed1539",
    paddingVertical: 20,
    color: 'white',
    borderRadius: 15,
    textAlign:'center'
  }
});

import { db } from "./db";
import { ListaItemType } from "./utils/ListaItemType";

export function adicionarExercicioParaLista(exercicio : ListaItemType){
    db.minhaLista.push(exercicio);
    console.log("Exercicio adicionado! "+exercicio.id);
}

export function removerExercicioDaLista(id : number){
    db.minhaLista.filter((el)=>{return el.id !== id})
}
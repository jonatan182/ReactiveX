import { Observable, Observer} from "rxjs";

console.log('Hola Mundo!', 'jonatan');

const observer: Observer<any> ={//se puede crear un Observer
    next: value => console.log('Siguiente [next]:',value),
    error: error => console.warn('Error [obs]: ',error),
    complete: () => console.log('Completador ')
}
const obs$ = new Observable<string>(subs =>{
    subs.next("Hola");
    subs.next("Mundo");
    subs.complete();
    subs.next("Hola");
});

/*obs$.subscribe(res=>{
    console.log(res)
})*/

obs$.subscribe(console.log)//Es lo mismo que la parte de arriba, solo que más rapida

//Hay 3 posibles argumentos que se le pueden enviar a un subscribe resp:procesa el next del subscribe,  (error, () complete  => son opcionales)
obs$.subscribe(
    res=>console.log('next: ', res),
    error=>console.warn('Error: ', error),//es opcional
    ()=>console.info("Completado")//es opcional
)

obs$.subscribe(observer)
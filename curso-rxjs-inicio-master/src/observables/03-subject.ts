import { Observable, Observer, Subject } from "rxjs";

const observer:Observer<any> ={
    next: value => console.log('Siguiente [next]:',value),
    error: error => console.warn('Error [obs]: ',error),
    complete: () => console.log('Completador ')
}


const intervalo$ = new Observable<number>(subs=>{
 const interval = setInterval(()=>{
     subs.next(Math.random());//Se conoce como Cold Observale
    },1000);
    return ()=>{
        clearInterval(interval);
        console.log("Clear interval")
    }
})
/**
 * Caracteristicas Importantes!!
 * 
 * 1- Casteo Múltiple: Muchas suscripciones van a estar sujetas a este mismo subject "observable", y va a servirme para distribuir la misma
 *                     información a todos los lugades en donde estén suscritos
 * 2- También es un observer
 * 3- Tambiém se puede manejar el error, next y complete
 */
const subject$ = new Subject();
//MultiCast
const suscription = intervalo$.subscribe(subject$);
const subs1 = subject$.subscribe(observer);
const subs2 = subject$.subscribe(observer);

setTimeout(()=>{
    //Se Conoce como un Hot Observable
    subject$.next(182);//Nos permite insertar información al flujo de datos que mi observable "intervalo$" esta emitiendo
    subject$.complete();
    subject$.next(183);//X
    suscription.unsubscribe();//Para llamar al return de "intervalo$" y limpiar el interval
},3000)
//Cuando la data es producida por el observable en sí mismo, es conciderado un 'Cold Observale'. Pero cuando la 
//data es producida FUERA  del observable es llamado 'Hot Observable'

//Un subjet nos permite transformar un Cold observable a un Hot Observable
import { Observable, Observer} from "rxjs";

const observer: Observer<any> ={//se puede crear un Observer
    next: value => console.log('Siguiente [next]:',value),
    error: error => console.warn('Error [obs]: ',error),
    complete: () => console.log('Completador ')
}

const intervalo$ = new Observable<number>(suscriber=>{//Nuestro Semaforo es el observable
    //Crear un contador de 1,2,3,4,5 ...
    let contador:number = 0;
    //Se ejecuta cada segundo
    const interval = setInterval(()=>{
        //Cada segundo
        suscriber.next(contador++)
    },1000);
    setTimeout(()=>{
        suscriber.complete()//completa la suscripción y se invoca al return
    },2500)
    return ()=>{//Se ejecuta cada vez que se hace unsubscribe, o al darle "complete"
        clearInterval(interval)//para limpiar "finalizar" el intervalo, de esta manera ya no sigue corriendo y no hay fuga de memoria
        console.log("Intérvalo destruido")
    }
});

//const camion1 = intervalo$.subscribe(num=>console.log('Num1: ', num));//Camion 1 es un observer que esta suscrito al semaforo "observable"
//const camion2 = intervalo$.subscribe(num=>console.log('Num2: ', num));//Camion 2 es un observer que esta suscrito al semaforo "observable"

const camion1 = intervalo$.subscribe(observer);//Camion 1 es un observer que esta suscrito al semaforo "observable"
const camion2 = intervalo$.subscribe(observer);//Camion 2 es un observer que esta suscrito al semaforo "observable"

camion1.add(camion2);
//Se ejecuta a los 3 segundos de iniciada la aplicación
setTimeout(()=>{
    camion1.unsubscribe();//Para cancelar la suscripción, invocan al return del Observable
    camion2.unsubscribe();//Para cancelar la suscripción
    console.log("unsuscribe, completado timeOut")
},3000)
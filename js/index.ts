// tipos
interface TareaInterface{
    nombreTarea:string,
    fechaCreacionTarea:string
    fechaInicio?:string,
    fecheCierre?:string,
    estadoTarea:string,
    descripcionTarea?:string,
    colorTarea?:string
}





// clases  
class Tarea implements TareaInterface {

    nombreTarea:string
    fechaCreacionTarea:string
    fechaCierre:string
    fechaInicio:string
    estadoTarea:string
    descripcionTarea:string
    colorTarea:string


    constructor(nombreTarea_:string,fechaCreacionTarea_:string,estadoTarea_:string){
        this.nombreTarea=nombreTarea_
        this.fechaCreacionTarea=fechaCreacionTarea_
        this.estadoTarea=estadoTarea_
    }

    setColorTarea(color_:string):void{
        this.colorTarea=color_
    }

    setFechaTarea(fecha_inicio:string,fecha_cierre:string):void{
        this.fechaInicio=fecha_inicio
        this.fechaCierre=fecha_cierre
    }

    setDescripcionTarea(descipcion:string):void{
        this.descripcionTarea=descipcion
    }

    getNombreTarea():string {
        return this.nombreTarea
    }

}

// funciones franmari calle 6
let listaDeTarea:Array<Tarea>=[]

function evitarEnviarDatos(a:Event):void{
    a.preventDefault()
}

function guardar<T>(lista_:T[]):Function{
    let lista:T[]=lista_
    return (dato): any=> {
        lista.push(dato)
        return lista
    }
}

let guardarTarea:Function=guardar(listaDeTarea)

function capturardatosFormulario():void{
    let formulario:HTMLFormElement=document.getElementById("fromularioTarea") as HTMLFormElement
    let datosFormulario:FormData=new FormData(formulario)
    let nombreTarea:string=datosFormulario.get("nombreTarea") as string
    let fechaCreacionTarea:string=datosFormulario.get("fechaCreacionTarea") as string
    let estadoTarea:string=datosFormulario.get("estadoTarea") as string
    let fechaInicio:string=datosFormulario.get("fechaInicio") as string
    let fecheCierre:string=datosFormulario.get("fecheCierre") as string
    let descripcionTarea:string=datosFormulario.get("descripcionTarea") as string
    let tarea:Tarea=new Tarea(nombreTarea,fechaCreacionTarea,estadoTarea)
    if(fechaInicio && fecheCierre){
        tarea.setFechaTarea(fechaInicio,fecheCierre)
    }
    if(descripcionTarea){
        tarea.setDescripcionTarea(descripcionTarea)
    }
    listaDeTarea=guardarTarea(tarea)
    document.getElementById("totalTareas").textContent=listaDeTarea.length.toString()
    let $modalFromularioTarea:HTMLElement=document.getElementById("modalFromularioTarea")
    let modal:any=bootstrap.Modal.getInstance($modalFromularioTarea)
    modal.hide()
    
}


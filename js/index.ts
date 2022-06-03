// objetivos del ejercicio
/**
 * agregar tarea listo
 * 
 * listar tarea listo
 * 
 * poder editar la tarea
 * 
 * tareas por color 
 * 
 * ver todos los datos de la tarea en la carta pero en caso de que la descricion
 *      sea muy larga acortarla y agregar un boton de ver mas  para ver la descripcion 
 *      completa
*/


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

    getFechaCreacionTarea():string {
        return this.fechaCreacionTarea
    }

    getFechaInicio():string {
        return this.fechaInicio
    }

    getFechaCierre():string {
        return this.fechaCierre
    }

    getDescripcion():string {
        return this.descripcionTarea
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
    renderisarCartas()
}

function renderisarCartas():void {
    let $filasCartas:HTMLElement=document.getElementById("filasCartas")
    let fragmento:DocumentFragment=document.createDocumentFragment()
    let cartasHTML:Array<DocumentFragment>=listaDeTarea.map( tarea => {
        return crearCartaTarea(tarea)
    })
    cartasHTML.map(carta => {
        fragmento.appendChild(carta)
    })
    $filasCartas.appendChild(fragmento)
}

function crearCartaTarea(datosTarea:Tarea):DocumentFragment{
    let templateCartaHtml:HTMLTemplateElement=document.getElementById("templateCartTarea") as HTMLTemplateElement
    let carta:DocumentFragment=templateCartaHtml.content
    carta.querySelector(".card-header").textContent=datosTarea.getNombreTarea()
    carta.querySelector(".card-title").textContent="fecha de creacion: "+datosTarea.getFechaCreacionTarea()
    carta.querySelector(".card-text").textContent=datosTarea.getDescripcion()
    let clonCarta:DocumentFragment=document.importNode(carta,true)
    return clonCarta
}

renderisarCartas()


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

    getfFechaCreacionTarea():string {
        return this.fechaCreacionTarea
    }

    getfFechaInicio():string {
        return this.fechaInicio
    }

    getfFechaCierre():string {
        return this.fechaCierre
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
    // let $modalFromularioTarea:HTMLElement=document.getElementById("modalFromularioTarea")
    // let modal:any=bootstrap.Modal.getInstance($modalFromularioTarea)
    // modal.hide()
}

function renderisarCartas():void {
    let fragmento:DocumentFragment=document.createDocumentFragment()
    let cartasHTML:Array<DocumentFragment>=listaDeTarea.map( tarea => {
        return crearCartaTarea(tarea)
    })
}

function crearCartaTarea(datosTarea:Tarea):DocumentFragment{
    let templateCartaHtml:HTMLTemplateElement=document.getElementById("templateCartTarea") as HTMLTemplateElement
    let carta:DocumentFragment=templateCartaHtml.content
    carta.querySelector(".card-header").textContent=datosTarea.getNombreTarea()
    carta.querySelector(".card-title").textContent=datosTarea.getNombreTarea()
    carta.querySelector(".card-text").textContent="sin descripcion"
    return carta
}

renderisarCartas()


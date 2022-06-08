// tipos
interface TareaInterface{
    nombreTarea:string,
    fechaCreacionTarea:string
    estadoTarea:string,
    descripcionTarea?:string,
    colorTarea?:string
}

// clases  
class Tarea implements TareaInterface {

    nombreTarea:string
    fechaCreacionTarea:string
    estadoTarea:string
    descripcionTarea:string
    colorTarea:string


    constructor(nombreTarea_:string,fechaCreacionTarea_:string,estadoTarea_:string){
        this.nombreTarea=nombreTarea_
        this.fechaCreacionTarea=fechaCreacionTarea_
        this.estadoTarea=estadoTarea_
    }

    setNombreTarea(nombreTarea_:string):void{
        this.nombreTarea=nombreTarea_
    }

    setFechaCreacionTarea(fechaCreacionTarea_:string):void{
        this.fechaCreacionTarea=fechaCreacionTarea_
    }

    setEstadoTarea(estadoTarea_:string):void{
        this.estadoTarea=estadoTarea_
    }

    setColorTarea(color_:string):void{
        this.colorTarea=color_
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

    getDescripcion():string {
        return this.descripcionTarea
    }

    getColorTarea():string{
        return this.colorTarea
    }

    getEstadoTarea():string {
        return this.estadoTarea
    }

}

// funciones franmari calle 6
let listaDeTarea:Array<Tarea>=[]

let tiposEstatusTarea:Object={
    E:"En Espera",
    P:"En Proceso",
    T:"Terminado"
}

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
    let descripcionTarea:string=datosFormulario.get("descripcionTarea") as string || "null"
    let colorTarea:string=datosFormulario.get("colorTarea") as string || "secondary"
    if(nombreTarea && fechaCreacionTarea){
        let tarea:Tarea=new Tarea(nombreTarea,fechaCreacionTarea,estadoTarea)
        tarea.setDescripcionTarea(descripcionTarea)
        tarea.setColorTarea(colorTarea)
        listaDeTarea=guardarTarea(tarea)
        document.getElementById("totalTareas").textContent=listaDeTarea.length.toString()
        renderisarCartas()
    }
    limpiarFormulario()
}

function capturardatosFormularioEditar(a:HTMLElement):void{
    let formulario:HTMLFormElement=document.getElementById("fromularioTarea") as HTMLFormElement
    let datosFormulario:FormData=new FormData(formulario)
    let nombreTarea:string=datosFormulario.get("nombreTarea") as string
    let fechaCreacionTarea:string=datosFormulario.get("fechaCreacionTarea") as string
    let estadoTarea:string=datosFormulario.get("estadoTarea") as string
    let descripcionTarea:string=datosFormulario.get("descripcionTarea") as string || "null"
    let colorTarea:string=datosFormulario.get("colorTarea") as string || "secondary"
    let tarea:Tarea=Object.assign(listaDeTarea[a.getAttribute("data-id-tarea")])
    if(nombreTarea && fechaCreacionTarea){
        tarea.setNombreTarea(nombreTarea)
        tarea.setFechaCreacionTarea(fechaCreacionTarea)
        tarea.setEstadoTarea(estadoTarea)
        tarea.setDescripcionTarea(descripcionTarea)
        tarea.setColorTarea(colorTarea)
        listaDeTarea[a.getAttribute("data-id-tarea")]=tarea
        renderisarCartas()
    }
    limpiarFormulario()
}

function prepararFromularioAntesDeGuardar():void{
    limpiarFormulario()
    let botonEditarFormulario:HTMLElement=document.getElementById("botonEditarFormulario")
    let botonGuardarFormulario:HTMLElement=document.getElementById("botonGuardarFormulario")
    botonGuardarFormulario.classList.remove("ocultar")
    botonEditarFormulario.classList.add("ocultar")
}

function prepararFromularioAntesDeEditar(a:HTMLElement):void{
    limpiarFormulario()
    let nombreTarea:HTMLInputElement=document.getElementById("nombreTarea") as HTMLInputElement
    let fechaCreacionTarea:HTMLInputElement=document.getElementById("fechaCreacionTarea") as HTMLInputElement
    let estadoTarea:HTMLInputElement=document.getElementById("estadoTarea") as HTMLInputElement
    let descripcionTarea:HTMLInputElement=document.getElementById("descripcionTarea") as HTMLInputElement
    let colorTarea:HTMLInputElement=document.getElementById("colorTarea") as HTMLInputElement
    let Tarea:Tarea=Object.assign(listaDeTarea[a.getAttribute("data-id-tarea")])
    let botonEditarFormulario:HTMLElement=document.getElementById("botonEditarFormulario")
    let botonGuardarFormulario:HTMLElement=document.getElementById("botonGuardarFormulario")
    botonGuardarFormulario.classList.add("ocultar")
    botonEditarFormulario.classList.remove("ocultar")
    botonEditarFormulario.setAttribute("data-id-tarea",a.getAttribute("data-id-tarea"))
    nombreTarea.value=Tarea.getNombreTarea()
    fechaCreacionTarea.value=Tarea.getFechaCreacionTarea()
    descripcionTarea.value=Tarea.getDescripcion()
    colorTarea.value=Tarea.getColorTarea()
    estadoTarea.value=Tarea.getEstadoTarea()
    console.log("datos de la tarea a editar =>>> ",Tarea)
}

function prepararModalEliminar(a:HTMLElement):void{
    let $botonEliminarTarea:HTMLElement=document.getElementById("botonEliminarTarea")
    $botonEliminarTarea.setAttribute("data-id-tarea",a.getAttribute("data-id-tarea"))
}

function eliminarTarea(a:HTMLElement):void{
    listaDeTarea=listaDeTarea.filter((tarea: Tarea, index: number) => index!=parseInt(a.getAttribute("data-id-tarea")))
    console.log("actulizacion de la lista =>> ",listaDeTarea)
    renderisarCartas()
}

function limpiarFormulario():void{
    campo("nombreTarea")
    campo("fechaCreacionTarea")
    campo("estadoTarea","E")
    campo("descripcionTarea")
    campo("colorTarea","primary")
}

function campo(nombreCampo:string,valorDefault?:string):void{
    let campo:HTMLInputElement = document.getElementById(nombreCampo) as HTMLInputElement
    if(valorDefault){
        campo.value=valorDefault
    }
    else{
        campo.value=""
    }
}

function renderisarCartas():void {
    let $filasCartas:HTMLElement=document.getElementById("filasCartas")
    let fragmento:DocumentFragment=document.createDocumentFragment()
    $filasCartas.innerHTML=""
    let cartasHTML:Array<DocumentFragment>=listaDeTarea.map( (tarea, index )=> {
        return crearCartaTarea(tarea, index)
    })
    cartasHTML.map(carta => {
        fragmento.appendChild(carta)
    })
    $filasCartas.appendChild(fragmento)
}

function crearCartaTarea(datosTarea:Tarea,index:number):DocumentFragment{
    let templateCartaHtml:HTMLTemplateElement=document.getElementById("templateCartTarea") as HTMLTemplateElement
    let carta:DocumentFragment=templateCartaHtml.content
    carta.querySelector("div.card").classList.add("bg-"+datosTarea.getColorTarea())
    carta.querySelector(".card-header").textContent=datosTarea.getNombreTarea()
    carta.querySelector(".card-title").textContent="fecha de creacion: "+datosTarea.getFechaCreacionTarea()
    carta.querySelector(".parrafo-carta").textContent=datosTarea.getDescripcion()
    carta.querySelector(".estado-tarea").textContent="Estatus: "+tiposEstatusTarea[datosTarea.getEstadoTarea()] as string
    let id: string = (index as unknown) as string
    carta.querySelector(".boton-editar").setAttribute("data-id-tarea",id)
    carta.querySelector(".boton-eliminar").setAttribute("data-id-tarea",id)
    let clonCarta:DocumentFragment=document.importNode(carta,true)
    carta.querySelector("div.card").classList.remove("bg-"+datosTarea.getColorTarea())
    return clonCarta
}

renderisarCartas()


// objetivos del ejercicio
/**
 *
 * poder editar la tarea
 *
 * ver todos los datos de la tarea en la carta pero en caso de que la descricion
 *      sea muy larga acortarla y agregar un boton de ver mas  para ver la descripcion
 *      completa
*/
// clases  
var Tarea = /** @class */ (function () {
    function Tarea(nombreTarea_, fechaCreacionTarea_, estadoTarea_) {
        this.nombreTarea = nombreTarea_;
        this.fechaCreacionTarea = fechaCreacionTarea_;
        this.estadoTarea = estadoTarea_;
    }
    Tarea.prototype.setColorTarea = function (color_) {
        this.colorTarea = color_;
    };
    Tarea.prototype.setDescripcionTarea = function (descipcion) {
        this.descripcionTarea = descipcion;
    };
    Tarea.prototype.getNombreTarea = function () {
        return this.nombreTarea;
    };
    Tarea.prototype.getFechaCreacionTarea = function () {
        return this.fechaCreacionTarea;
    };
    Tarea.prototype.getDescripcion = function () {
        return this.descripcionTarea;
    };
    Tarea.prototype.getColorTarea = function () {
        return this.colorTarea;
    };
    Tarea.prototype.getEstadoTarea = function () {
        return this.estadoTarea;
    };
    return Tarea;
}());
// funciones franmari calle 6
var listaDeTarea = [];
var tiposEstatusTarea = {
    E: "En Espera",
    P: "En Proceso",
    T: "Terminado"
};
function evitarEnviarDatos(a) {
    a.preventDefault();
}
function guardar(lista_) {
    var lista = lista_;
    return function (dato) {
        lista.push(dato);
        return lista;
    };
}
var guardarTarea = guardar(listaDeTarea);
function capturardatosFormulario() {
    var formulario = document.getElementById("fromularioTarea");
    var datosFormulario = new FormData(formulario);
    var nombreTarea = datosFormulario.get("nombreTarea");
    var fechaCreacionTarea = datosFormulario.get("fechaCreacionTarea");
    var estadoTarea = datosFormulario.get("estadoTarea");
    var descripcionTarea = datosFormulario.get("descripcionTarea") || "null";
    var colorTarea = datosFormulario.get("colorTarea") || "secondary";
    if (nombreTarea && fechaCreacionTarea) {
        var tarea = new Tarea(nombreTarea, fechaCreacionTarea, estadoTarea);
        tarea.setDescripcionTarea(descripcionTarea);
        tarea.setColorTarea(colorTarea);
        listaDeTarea = guardarTarea(tarea);
        document.getElementById("totalTareas").textContent = listaDeTarea.length.toString();
        renderisarCartas();
    }
    // else{
    // }
}
function renderisarCartas() {
    var $filasCartas = document.getElementById("filasCartas");
    var fragmento = document.createDocumentFragment();
    $filasCartas.innerHTML = "";
    var cartasHTML = listaDeTarea.map(function (tarea, index) {
        return crearCartaTarea(tarea, index);
    });
    cartasHTML.map(function (carta) {
        fragmento.appendChild(carta);
    });
    $filasCartas.appendChild(fragmento);
}
function crearCartaTarea(datosTarea, index) {
    var templateCartaHtml = document.getElementById("templateCartTarea");
    var carta = templateCartaHtml.content;
    carta.querySelector("div.card").classList.add("bg-" + datosTarea.getColorTarea());
    carta.querySelector(".card-header").textContent = datosTarea.getNombreTarea();
    carta.querySelector(".card-title").textContent = "fecha de creacion: " + datosTarea.getFechaCreacionTarea();
    carta.querySelector(".parrafo-carta").textContent = datosTarea.getDescripcion();
    carta.querySelector(".estado-tarea").textContent = "Estatus: " + tiposEstatusTarea[datosTarea.getEstadoTarea()];
    var id = index;
    carta.querySelector(".boton-editar").setAttribute("id", id);
    var clonCarta = document.importNode(carta, true);
    carta.querySelector("div.card").classList.remove("bg-" + datosTarea.getColorTarea());
    return clonCarta;
}
renderisarCartas();

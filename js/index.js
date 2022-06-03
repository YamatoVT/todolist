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
    Tarea.prototype.setFechaTarea = function (fecha_inicio, fecha_cierre) {
        this.fechaInicio = fecha_inicio;
        this.fechaCierre = fecha_cierre;
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
    Tarea.prototype.getFechaInicio = function () {
        return this.fechaInicio;
    };
    Tarea.prototype.getFechaCierre = function () {
        return this.fechaCierre;
    };
    Tarea.prototype.getDescripcion = function () {
        return this.descripcionTarea;
    };
    return Tarea;
}());
// funciones franmari calle 6
var listaDeTarea = [];
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
    var fechaInicio = datosFormulario.get("fechaInicio");
    var fecheCierre = datosFormulario.get("fecheCierre");
    var descripcionTarea = datosFormulario.get("descripcionTarea");
    var tarea = new Tarea(nombreTarea, fechaCreacionTarea, estadoTarea);
    if (fechaInicio && fecheCierre) {
        tarea.setFechaTarea(fechaInicio, fecheCierre);
    }
    if (descripcionTarea) {
        tarea.setDescripcionTarea(descripcionTarea);
    }
    listaDeTarea = guardarTarea(tarea);
    document.getElementById("totalTareas").textContent = listaDeTarea.length.toString();
    renderisarCartas();
}
function renderisarCartas() {
    var $filasCartas = document.getElementById("filasCartas");
    var fragmento = document.createDocumentFragment();
    var cartasHTML = listaDeTarea.map(function (tarea) {
        return crearCartaTarea(tarea);
    });
    cartasHTML.map(function (carta) {
        fragmento.appendChild(carta);
    });
    $filasCartas.appendChild(fragmento);
}
function crearCartaTarea(datosTarea) {
    var templateCartaHtml = document.getElementById("templateCartTarea");
    var carta = templateCartaHtml.content;
    carta.querySelector(".card-header").textContent = datosTarea.getNombreTarea();
    carta.querySelector(".card-title").textContent = "fecha de creacion: " + datosTarea.getFechaCreacionTarea();
    carta.querySelector(".card-text").textContent = datosTarea.getDescripcion();
    var clonCarta = document.importNode(carta, true);
    return clonCarta;
}
renderisarCartas();

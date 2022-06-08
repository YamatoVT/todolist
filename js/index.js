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
    Tarea.prototype.setNombreTarea = function (nombreTarea_) {
        this.nombreTarea = nombreTarea_;
    };
    Tarea.prototype.setFechaCreacionTarea = function (fechaCreacionTarea_) {
        this.fechaCreacionTarea = fechaCreacionTarea_;
    };
    Tarea.prototype.setEstadoTarea = function (estadoTarea_) {
        this.estadoTarea = estadoTarea_;
    };
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
    limpiarFormulario();
}
function capturardatosFormularioEditar(a) {
    var formulario = document.getElementById("fromularioTarea");
    var datosFormulario = new FormData(formulario);
    var nombreTarea = datosFormulario.get("nombreTarea");
    var fechaCreacionTarea = datosFormulario.get("fechaCreacionTarea");
    var estadoTarea = datosFormulario.get("estadoTarea");
    var descripcionTarea = datosFormulario.get("descripcionTarea") || "null";
    var colorTarea = datosFormulario.get("colorTarea") || "secondary";
    var tarea = Object.assign(listaDeTarea[a.getAttribute("data-id-tarea")]);
    if (nombreTarea && fechaCreacionTarea) {
        tarea.setNombreTarea(nombreTarea);
        tarea.setFechaCreacionTarea(fechaCreacionTarea);
        tarea.setEstadoTarea(estadoTarea);
        tarea.setDescripcionTarea(descripcionTarea);
        tarea.setColorTarea(colorTarea);
        listaDeTarea[a.id] = tarea;
        renderisarCartas();
    }
    limpiarFormulario();
}
function prepararFromularioAntesDeGuardar() {
    limpiarFormulario();
    var botonEditarFormulario = document.getElementById("botonEditarFormulario");
    var botonGuardarFormulario = document.getElementById("botonGuardarFormulario");
    botonGuardarFormulario.classList.remove("ocultar");
    botonEditarFormulario.classList.add("ocultar");
}
function prepararFromularioAntesDeEditar(a) {
    limpiarFormulario();
    var nombreTarea = document.getElementById("nombreTarea");
    var fechaCreacionTarea = document.getElementById("fechaCreacionTarea");
    var estadoTarea = document.getElementById("estadoTarea");
    var descripcionTarea = document.getElementById("descripcionTarea");
    var colorTarea = document.getElementById("colorTarea");
    var Tarea = Object.assign(listaDeTarea[a.id]);
    var botonEditarFormulario = document.getElementById("botonEditarFormulario");
    var botonGuardarFormulario = document.getElementById("botonGuardarFormulario");
    botonGuardarFormulario.classList.add("ocultar");
    botonEditarFormulario.classList.remove("ocultar");
    botonEditarFormulario.setAttribute("data-id-tarea", a.id);
    nombreTarea.value = Tarea.getNombreTarea();
    fechaCreacionTarea.value = Tarea.getFechaCreacionTarea();
    descripcionTarea.value = Tarea.getDescripcion();
    colorTarea.value = Tarea.getColorTarea();
    estadoTarea.value = Tarea.getEstadoTarea();
    console.log("datos de la tarea a editar =>>> ", Tarea);
}
function limpiarFormulario() {
    campo("nombreTarea");
    campo("fechaCreacionTarea");
    campo("estadoTarea", "E");
    campo("descripcionTarea");
    campo("colorTarea", "primary");
}
function campo(nombreCampo, valorDefault) {
    var campo = document.getElementById(nombreCampo);
    if (valorDefault) {
        campo.value = valorDefault;
    }
    else {
        campo.value = "";
    }
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
    carta.querySelector(".boton-editar").setAttribute("onclick", "prepararFromularioAntesDeEditar(this)");
    var clonCarta = document.importNode(carta, true);
    carta.querySelector("div.card").classList.remove("bg-" + datosTarea.getColorTarea());
    return clonCarta;
}
renderisarCartas();

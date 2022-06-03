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
    var $modalFromularioTarea = document.getElementById("modalFromularioTarea");
    var modal = bootstrap.Modal.getInstance($modalFromularioTarea);
    modal.hide();
}

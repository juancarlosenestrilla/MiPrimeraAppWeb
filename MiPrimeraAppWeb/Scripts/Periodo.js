

$("#datepickerInicio").datepicker(
    {
        dateFormat: "dd/mm/yy",
        changeMonth: true,
        changeYear: true
    }
);  //para que salga el calendario -almaneque-

$("#datepickerFin").datepicker(
    {
        dateFormat: "dd/mm/yy",
        changeMonth: true,
        changeYear: true
    }

);



listar();





function listar() {
    $.get("../Periodo/listarPeriodo", function (data) {
        // alert(JSON.stringify(data));
        crearListado(["Id Periodo", "Nombre", "Fecha Inicio", "Fecha Fin"], data)

    }
    );
}


//busqueda sensitiva
var nombrePeriodo = document.getElementById("txtnombre");
nombrePeriodo.onkeyup = function () {     //onkeyup realiza la busqueda sensitiva y se ejecuta cada que se presiona una tecla
   // alert("hola");

    var nombre = document.getElementById("txtnombre").value;
    $.get("../Periodo/buscarPeriodoPorNombre/?nombrePeriodo=" + nombre, function (data) {

        crearListado(["Id Periodo", "Nombre", "Fecha Inicio", "Fecha Fin"],data);
        }
        )
}




function crearListado(arrayColumnas, data) {
    var contenido = "";
    contenido += "<table id='tablas'  class='table' >";
    contenido += "<thead>";
    contenido += "<tr>";
    for (var i = 0; i < arrayColumnas.length; i++) {
        contenido += "<td>";
        contenido += arrayColumnas[i];
        contenido += "</td>";

    }

    //Añadir una columna
    contenido += "<td>Operaciones</td>";

    contenido += "</tr>";
    contenido += "</thead>";
    var llaves = Object.keys(data[0]);
     // alert(llaves)   //nos muestra  el objeto id, Nombre, fecha_inicio,etc en array
    contenido += "<tbody>";
    for (var i = 0; i < data.length; i++) {
        contenido += "<tr>";
        for (var j = 0; j < llaves.length; j++) {
            var valorLLaves = llaves[j];
            contenido += "<td>";
            contenido += data[i][valorLLaves];
            contenido += "</td>";

        }

        //Iconos
        var llaveId = llaves[0];  //sacamos el id en su primera posicion para poder gestionar los datos de un registro, editar o borrar
        contenido += "<td>";
        contenido += "<button class='btn btn-primary' onclick='abrirModal(" + data[i][llaveId] + ")' data-toggle='modal' data-target='#myModal'><i class='glyphicon glyphicon-edit'></i></button> "
        contenido += "<button class='btn btn-danger' onclick='eliminar(" + data[i][llaveId] + ")' ><i class='glyphicon glyphicon-trash'></i></button>"
        contenido += "</td>"
        //fin-iconos

        contenido += "</tr>";
    }
    contenido += "</tbody>";
    contenido += "</table>";
    document.getElementById("periodo").innerHTML = contenido;
    $("#tablas").dataTable(
        {
            searching: false
        }

    );
}

borrarDatos();

function borrarDatos() {
    var controles = document.getElementsByClassName("borrar");
    // console.log(controles);
    var ncontroles = controles.length;
    for (var i = 0; i < ncontroles; i++) {
        controles[i].value = "";
    }
}


function datosObligarios() {
    var exito = true;
    var controlesObligatorio = document.getElementsByClassName("obligatorio");
    // console.log(controles);
    var ncontroles = controlesObligatorio.length;
    alert(ncontroles);
    for (var i = 0; i < ncontroles; i++) {
        if (controlesObligatorio[i].value == "") {
            exito = false;
            controlesObligatorio[i].parentNode.classList.add("error");   // parentNode saca la etiqueta padre que tiene este control actua sobre la etiqueta td de la etiqueta input

        } else {
            controlesObligatorio[i].parentNode.classList.remove("error");
        }



    }
    return exito;
}

//eliminar
function eliminar(id) {
    //alert(id);
    var frm = new FormData();
    frm.append("IIDPERIODO", id); //jalamos IIDCURSO de la consulta de la bd en el controlador

    if (confirm("¿Desea realmente Eliminar?") == 1) { //confirm vota una ventana, ==1 equivale a true
        $.ajax({
            type: "POST",   //TODO LO QUE SE ENCIE AL CONTROLLADOR ES POST
            url: "../Periodo/eliminar",
            data: frm,
            contentType: false,
            processData: false,
            success: function (data) { //el success es lo importante que es la respuesta que envia del controlador
                if (data != 0) {       //o (data == 0){alert("Ocurrio un error")}
                    //es porque todo esta bien
                    listar();
                    alert("Se ejecuto correctamente");
                    document.getElementById("btnCancelar").click();//se le da click al boton internamente


                } else {
                    alert("Ocurrio un error");
                }
            }
        });
    }


}


/*
function crearListado(data) {

    var contenido = "";

    contenido += "<table id='tabla-periodo' class='table'>";
    contenido += "<thead>";

    contenido += "<tr>";

    contenido += "<td>Id Periodo</td>";
    contenido += "<td>Nombre</td>";
    contenido += "<td>Fecha Inicio</td>";
    contenido += "<td>Fecha Fin</td>";

    contenido += "</tr>";

    contenido += "</thead>";

    contenido += "<tbody>";

    for (var i = 0; i < (data.length); i++) {
        contenido += "<tr>";
        contenido += "<td>" + data[i].IIDPERIODO + "</td>";
        contenido += "<td>" + data[i].NOMBRE + "</td>";
        contenido += "<td>" + data[i].FECHAINICIO + "</td>";
        contenido += "<td>" + data[i].FECHAFIN + "</td>";
        contenido += "</tr>";
    }
    contenido += "</tbody>";
    contenido += "</table>";

    document.getElementById("periodo").innerHTML = contenido;

    $("#tabla-periodo").dataTable(
        {
            searching: false
        }

    );
}*/


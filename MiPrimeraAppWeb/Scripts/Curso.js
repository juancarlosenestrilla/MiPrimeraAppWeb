

listar()

function listar() {
    $.get("Curso/listarCurso", function (data) {
        //alert(JSON.stringify(data));
        crearListado(["Id Curso","Nombre","Descripcion"], data);


    }
    );
}

var btnBuscar = document.getElementById("btnBuscar");

btnBuscar.onclick = function () {
    var nombre = document.getElementById("txtnombre").value;
    $.get("../Curso/buscarCursoPorNombre/?nombre=" + nombre, function (data) {

        //alert(JSON.stringify(data));

        crearListado(["Id Curso", "Nombre Curso", "Descripcion"],data);
    });
}


var btnLimpiar = document.getElementById("btnLimpiar");
btnLimpiar.onclick = function () {
    $.get("../Curso/listarCurso", function (data) {

        crearListado(data);

    });

    document.getElementById("txtnombre").value = "";
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

     // alert(llaves)   //nos muestra  el objeto id, descripcio, etc en array

    contenido += "<tbody>";
    for (var i = 0; i < data.length; i++) {
        contenido += "<tr>";
        for (var j = 0; j < llaves.length; j++) {
            var valorLLaves = llaves[j];
            contenido += "<td>";
            contenido += data[i][valorLLaves];
            contenido += "</td>";

        }
        var llaveId = llaves[0];   //sacamos el id en su primera posicion para poder gestionar los datos de un registro, editar o borrar

        //Iconos
        contenido += "<td>";
        contenido += "<button class='btn btn-primary' onclick='abrirModal(" + data[i][llaveId] + ")' data-toggle='modal' data-target='#myModal'><i class='glyphicon glyphicon-edit'></i></button> "
        contenido += "<button class='btn btn-danger' onclick='eliminar(" + data[i][llaveId] + ")' ><i class='glyphicon glyphicon-trash'></i></button>"
        contenido += "</td>"
        //fin-iconos
        contenido += "</tr>";
    }
    contenido += "</tbody>";
    contenido += "</table>";
    document.getElementById("tabla").innerHTML = contenido;
    $("#tablas").dataTable(
        {
            searching: false
        }

    );
}



function abrirModal(id) {  // en el boton editar
   // alert("Editar");
   // alert(id);  //nos muestra el id del registro a editar

    // el siguiente codigo borra o limpias las x rojas de los modales de todos los errores
    var controlesObligatorio = document.getElementsByClassName("obligatorio");
    var ncontroles = controlesObligatorio.length;
    for (var i = 0; i < ncontroles; i++) {
        controlesObligatorio[i].parentNode.classList.remove("error");
    } //hasta aca las X rojas

    if (id === 0) {
        alert("es del boton nuevo registro");
        borrarDatos();
    }
    else {
        //alert("Es del boton editar")

        $.get("../Curso/recuperarDatos/?id=" + id, function (data) {
            document.getElementById("txtidCurso").value = data[0].IIDCURSO;
            document.getElementById("txtNombre").value = data[0].NOMBRE;
            document.getElementById("txtDescripcion").value = data[0].DESCRIPCION;
            
        })
    }



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

function Agregar() {
    
    if (datosObligarios() == true) {
        var frm = new FormData();   //objeto FormData()
        var id = document.getElementById("txtidCurso").value;
        var nombre = document.getElementById("txtNombre").value;
        var descripcion = document.getElementById("txtDescripcion").value;

        frm.append("IIDCURSO", id); //jalamos IIDCURSO de la consulta de la bd en el controlador
        frm.append("NOMBRE", nombre);
        frm.append("DESCRIPCION", descripcion);
        frm.append("BHABILITADO", 1);


        if (confirm("¿Desea realmente Guardar?") == 1) { //confirm vota una ventana, ==1 equivale a true
            $.ajax({
                type: "POST",   //TODO LO QUE SE ENCIE AL CONTROLLADOR ES POST
                url: "../Curso/guardarDatos",
                data: frm,
                contentType: false,
                processData: false,
                success: function (data) {  //Data es el resultado que enviamos del controlador en este caso es --return nregistrosAfectados--
                    if (data != 0) {
                        //es porque todo esta bien
                        listar();
                        alert("Se ejecuto correctamente al agregar");
                        document.getElementById("btnCancelar").click();  //se le da click al boton internamente


                    } else {
                        alert("Ocurrio un error");
                    }
                }
            });
        }

        //data es el resultado que uno vota del controlador en el return

    } else { }


        
    
    
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
    frm.append("IIDCURSO", id); //jalamos IIDCURSO de la consulta de la bd en el controlador

    if (confirm("¿Desea realmente Eliminar?") == 1) { //confirm vota una ventana, ==1 equivale a true
        $.ajax({
            type: "POST",   //TODO LO QUE SE ENCIE AL CONTROLLADOR ES POST
            url: "../Curso/eliminar",
            data: frm,
            contentType: false,
            processData: false,
            success: function (data) { //el success es lo importante que es la respuesta que envia del controlador
                if (data != 0) {
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

    contenido += "<table id='tabla-curso' class='table'>";
    contenido += "<thead>";

    contenido += "<tr>";

    contenido += "<td>Id Curso</td>";
    contenido += "<td>Nombre</td>";
    contenido += "<td>Descripción</td>";

    contenido += "</tr>";

    contenido += "</thead>";

    contenido += "<tbody>";
    

    for (var i = 0; i < (data.length); i++) {
        contenido += "<tr>";
        contenido += "<td>" + data[i].IIDCURSO + "</td>";
        contenido += "<td>" + data[i].NOMBRE + "</td>";
        contenido += "<td>" + data[i].DESCRIPCION + "</td>";
        contenido += "</tr>";
    }
    contenido += "</tbody>";
    contenido += "</table>";

    document.getElementById("tabla").innerHTML = contenido;
    $("#tabla-curso").dataTable(
        {
            searching:false
        }

    );
} */


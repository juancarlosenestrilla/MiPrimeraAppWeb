
$("#dtfechaNacimiento").datepicker(
    {
        dateFormat: "dd/mm/yy",
        changeMonth: true,
        changeYear: true
    }
);  //para que salga el calendario -almaneque-



listar();
function listar() {
    $.get("../Alumno/listarAlumnos", function (data) {

        listarAlumnos(["Id", "Nombre", "Apellido Paterno", "Apellido Materno", "Telefono Padre"], data);

        //listarAlumnos(data);
        //alert(JSON.stringify(data));

    });

}

$.get("../Alumno/listarSexo", function (data) {
    llenarCombo(data, document.getElementById("cboSexo"), true);  //control = a document.getElementById("cboSexo")
    llenarCombo(data, document.getElementById("cboSexoPopu"), true);
   
});

var btnBuscar = document.getElementById("btnBuscar");
btnBuscar.onclick = function () {
    //alert("hola");
    var iidsexo = document.getElementById("cboSexo").value;
    if (iidsexo == "") {
        alert("hola");
        listar();
    }
    else
    $.get("../Alumno/filtrarAlumnoPorSexo/?iidsexo=" + iidsexo, function (data) {
        crearListado(["Id", "Nombre", "Apellido Paterno", "Apellido Materno", "Telefono Padre"], data);
                      //lo que esta entre corchetes lo reconoce como arrayColumnas y no los fija como el encabezado de una tabla
                      //Cambios en clase 23
    });

        
}

var btnLimpiar = document.getElementById("btnLimpiar");
btnLimpiar.onclick = function () {
    listar();

};




function llenarCombo(data, control, primerElemento) {   //control es igual a -- document.getElementById("cboSexo")--
    var contenido = " ";
    if (primerElemento == true) {
        contenido += "<option value='' >--Seleccione--</option>";
    };
    for (var i = 0; i < (data.length); i++) {
        contenido += "<option value=' " + data[i].IID + " '>"; //IID esta renombrado en el controlador

        contenido += data[i].NOMBRE;
        contenido += "</option>";
    }

    //document.getElementById("cboSexo").innerHTML = contenido;
    control.innerHTML = contenido;
}




 
function listarAlumnos(arrayColumnas,data ) {
    var contenido = " ";

    contenido += "<table id='tabla-alumno' class='table'>";
    contenido += "<thead>";
    contenido += "<tr>";  // con el <tr> pintamos las columnas
    for (var i = 0; i < arrayColumnas.length; i++) {
        contenido += "<td>";
        contenido += arrayColumnas[i];
        contenido += "</td>";
    }
    contenido += "</tr>";
    contenido += "</thead>";

    var llaves = Object.keys(data[0]);  //saca las claves/llaves del JSON
    //alert(llaves);
    contenido += "<tbody>";
    for ( var i = 0; i < (data.length); i++) {
        contenido += "<tr>";
        for (var j = 0; j < llaves.length; j++) {
            var valorLlaves = llaves[j];
            contenido += "<td>";
            contenido += data[i][valorLlaves];
            contenido += "</td>";
        }
        //botones
        var llaveId = llaves[0];
        contenido += "<td>";
        contenido += "<button class='btn btn-primary' onclick='abrirModal(" + data[i][llaveId] + ")' data-toggle='modal' data-target='#myModal'><i class='glyphicon glyphicon-edit'></i></button> "
        contenido += "<button class='btn btn-danger' onclick='eliminar(" + data[i][llaveId] + ")' ><i class='glyphicon glyphicon-trash'></i></button>"
        contenido += "</td>"
        //fin-botones
               
        contenido += "</tr>";
    };
    contenido += "</tbody>";
    contenido += "</table>";

    document.getElementById("tabla").innerHTML = contenido;

    $("#tabla-alumno").dataTable(
        {
            searching: false
        }

    );

}

/* Metodo genericos antes
function listarAlumnos(data) {
    var contenido = " ";

    contenido += "<table id='tabla-alumno'>";
    contenido += "<thead>";
    contenido += "<tr>";
    contenido += "<td>Id Alumnos</td>";
    contenido += "<td>Nombre</td>";
    contenido += "<td>Apellido Paterno</td>";
    contenido += "<td>Apellido Materno</td>";
    contenido += "<td>Telefono Padre</td>";
    contenido += "</tr>";
    contenido += "</thead";

    contenido += "<tbody>";
    for (var i = 0; i < (data.length); i++) {
        contenido += "<tr>";
        contenido += "<td>" + data[i].IIDALUMNO + "</td>";
        contenido += "<td>" + data[i].NOMBRE + "</td>";
        contenido += "<td>" + data[i].APPATERNO + "</td>";
        contenido += "<td>" + data[i].APMATERNO + "</td>";
        contenido += "<td>" + data[i].TELEFONOPADRE + "</td>";
        contenido += "</tr>";
    };
    contenido += "</tbody>";
    contenido += "</table>";

    document.getElementById("tabla").innerHTML = contenido;

    $("#tabla-alumno").dataTable(
        {
            searching: false
        }

    );
    */



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
        contenido += "<td>Operaciones</td>";
        contenido += "</tr>";
        contenido += "</thead>";
        var llaves = Object.keys(data[0]);
        contenido += "<tbody>";
        for (var i = 0; i < data.length; i++) {
            contenido += "<tr>";
            for (var j = 0; j < llaves.length; j++) {
                var valorLLaves = llaves[j];
                contenido += "<td>";
                contenido += data[i][valorLLaves];
                contenido += "</td>";

            }
            var llaveId = llaves[0];
            contenido += "<td>";
            contenido += "<button class='btn btn-primary' onclick='abrirModal(" + data[i][llaveId] + ")' data-toggle='modal' data-target='#myModal'><i class='glyphicon glyphicon-edit'></i></button> "
            contenido += "<button class='btn btn-danger' onclick='eliminar(" + data[i][llaveId] + ")' ><i class='glyphicon glyphicon-trash'></i></button>"
            contenido += "</td>"

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
    

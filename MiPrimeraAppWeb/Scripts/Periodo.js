

$.get("../Periodo/listarPeriodo", function (data) {
    // alert(JSON.stringify(data));
    crearListado(data);

}
);

var nombrePeriodo = document.getElementById("txtnombre");
nombrePeriodo.onkeyup = function () {
   // alert("hola");

    var nombre = document.getElementById("txtnombre").value;
    $.get("../Periodo/buscarPeriodoPorNombre/?nombrePeriodo=" + nombre, function (data) {

        crearListado(data);
        }
        )
}

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
}
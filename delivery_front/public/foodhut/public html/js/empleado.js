$(document).ready(function () {
    $("tr").on("click", function () {
        filaSeleccionada = true;
        $("#Id").val($(this).find("td").eq(0).text().trim());
        $("#Nombre").val($(this).find("td").eq(1).text().trim());
        $("#Contacto").val($(this).find("td").eq(2).text().trim());
        $("#Cargo").val($(this).find("td").eq(3).text().trim());
    });
    $("#btnGuardar").on("click", function () {
    var nombre = $("#Nombre").val();
    var contacto = $("#Contacto").val();
    var cargo = $("#Cargo").val();
    console.log("datos",nombre,Contacto,Cargo);
    if (validarNombre(nombre)) {
        $.post("/empleados/guardar", {
        Nombre:nombre,
        Contacto:contacto,
        Cargo:cargo
        }, function (data) {
        console.log(data);
        var d = JSON.parse(JSON.stringify(data));
        if(d.tipo==1){
            alert("aqui");
            location.reload();
        }
        else
            alert(data);
        });
    }
    else
        alert("Debe llenar los campos");
    });
    function validarNombre(n) {
    if (!n)
        return false;
    else
        return true;
    }
    $("#btnActualizar").on("click", function () {
        var id = $("#Id").val();
        var nombre = $("#Nombre").val();
        var contacto = $("#Contacto").val();
        var cargo = $("#Cargo").val();
        console.log("datos a", id, nombre, contacto,cargo);
        if (validarNombre(nombre)) {
            $.post("/empleados/actualizar", {
                Id: id,
                Nombre: nombre,
                Contacto: contacto,
                Cargo: cargo
            }, function (data) {
                console.log(data);
                var d = JSON.parse(data);
                if (d.tipo === 1) {
                    alert(d.mensaje);
                    location.reload();
                } else {
                    alert(d.mensaje);
                }
            });
        } else {
            alert("Debe llenar los campos");
        }
    });
    $("#btnEliminar").on("click", function () {
        var id = $("#Id").val();
        console.log("datos a", id);
        $.post("/empleados/eliminar", {
            Id: id,
        }, function (data) {
            console.log(data);
            var d = JSON.parse(data);
            if (d.tipo === 1) {
                alert(d.mensaje);
                location.reload();
            } else {
                alert(d.mensaje);
            }
        });
    });
});
$(document).ready(function () {
    $("tr").on("click", function () {
        filaSeleccionada = true;
        $("#Id").val($(this).find("td").eq(0).text().trim());
        $("#Nombre").val($(this).find("td").eq(1).text().trim());
        $("#Descripcion").val($(this).find("td").eq(2).text().trim());
        $("#Contacto").val($(this).find("td").eq(3).text().trim());
        $("#IdCategoria").val($(this).find("td").eq(4).text().trim());
    });
    $("#btnGuardar").on("click", function () {
    var nombre = $("#Nombre").val();
    var descripcion = $("#Descripcion").val();
    var contacto = $("#Contacto").val();
    var idcategoria = $("#IdCategoria").val();
    console.log("datos",nombre,descripcion,contacto,idcategoria);
    if (validarNombre(nombre)) {
        $.post("/proveedor/guardar", {
        Nombre:nombre,
        Descripcion:descripcion,
        Contacto: contacto,
        IdCategoria: idcategoria
        }, function (data) {
        console.log(data);
        var data = JSON.parse(JSON.stringify(data));
        if(data === 'Guardado correctamenta'){
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
        var descripcion = $("#Descripcion").val();
        var contacto = $("#Contacto").val();
        var idcategoria = $("#IdCategoria").val();
        console.log("datos a", id, nombre, descripcion, contacto, idcategoria);
    
        if (validarNombre(nombre)) {
            $.post("/proveedor/actualizar", {
                Id: id,
                Nombre: nombre,
                Descripcion: descripcion,
                Contacto: contacto,
                IdCategoria: idcategoria
            }, function (data) {
                console.log(data);
                var d = JSON.parse(data);
                if (d.tipo === 1) {
                    alert(d.mensaje);
                    location.reload();
                } else {
                    alert(d.mensaje);
                }
            }).fail(function (jqXHR, textStatus, errorThrown) {
                alert("Error al realizar la petición: " + textStatus + " " + errorThrown);
            });
        } else {
            alert("Debe llenar los campos");
        }
    });
    
    $("#btnEliminar").on("click", function () {
        var id = $("#Id").val();
        console.log("datos a", id);
        $.post("/proveedor/eliminar", {
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
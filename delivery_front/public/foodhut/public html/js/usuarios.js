$(document).ready(function () {
    $("tr").on("click", function () {
        filaSeleccionada = true;
        $("#Usuario").val($(this).find("td").eq(0).text().trim());
        $("#Contraseña").val($(this).find("td").eq(1).text().trim());
        $("#IdRol").val($(this).find("td").eq(2).text().trim());
    });
    $("#btnGuardar").on("click", function () {
        var usuario = $("#Usuario").val();
        var contrasena = $("#Contraseña").val();
        var idrol = $("#IdRol").val();
        console.log("datos", usuario, contrasena, idrol);
        if (validarNombre(usuario)) {
            $.post("/usuario/guardar", {
                Usuario: usuario,
                Contrasena: contrasena,
                IdRol: idrol
            }, function (data) {
                console.log(data);
                var data = JSON.parse(JSON.stringify(data));
                if (data === 'Guardar correctamente') {
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
    $("#btnActualizar").on("click", function (event) {
        event.preventDefault();
        var Nombre = $("#Usuario").val().trim();
        var Contra = $("#Contraseña").val().trim();
        console.log("Datos actualizados:", Nombre, Contra);

        if (validarNombre(Nombre)) {
            $.post("/usuario/actualizar", {
                Usuario: Nombre,
                Contrasena: Contra
            }, function (data) {
                console.log("Respuesta del servidor (sin parsear):", data);
                try {
                    var d = JSON.parse(data);
                    console.log("Respuesta del servidor (parseada):", d);
                    if (d.tipo === 1) {
                        alert("Éxito: " + d.msj);
                        location.reload();
                    } else {
                        alert("Error: " + d.msj);
                    }
                } catch (e) {
                    console.error("Error al parsear la respuesta JSON:", e);
                    alert("Error: Respuesta del servidor no válida");
                }
            }).fail(function () {
                console.error("Error en la petición");
                alert("Error: Error en la petición");
            });
        } else {
            $(".loadData").text(Nombre + Contra);
            alert("Error: Nombre no válido");
        }
    });


    $("#btnEliminar").on("click", function () {
        var usuario = $("#Usuario").val();
        console.log("datos a", usuario);
        $.post("/usuario/eliminar", {
            Usuario: usuario,
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
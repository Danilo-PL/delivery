$(document).ready(function () {
    $("#btnIniciarSesion").on("click", function () {
        var nombre = $("#Usuario").val();
        var contrasena = $("#Contraseña").val();
        console.log("Datos", nombre + contrasena);
        if (validarNombre(nombre) && validarNombre(contrasena)) {
            $.post("/login/inicioSesion", {
                Usuario: nombre,
                Contrasena: contrasena
            }, function (data) {
                console.log(data);
                if (data.tipo == 1) {
                    alert("Bienvenido(a)");
                    location.reload();
                } else {
                    alert(data);
                }
            });
        } else {
            alert("Debe llenar los campos");
        }
    });

    function validarNombre(n) {
        return n && n.trim() !== "";
    }
});


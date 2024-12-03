$(document).ready(function () {
    $("tr").on("click", function () {
        filaSeleccionada = true;
        $("#Id").val($(this).find("td").eq(0).text().trim());
        $("#Nombre").val($(this).find("td").eq(1).text().trim());
        $("#Descripcion").val($(this).find("td").eq(2).text().trim());
        $("#PrecioVenta").val($(this).find("td").eq(3).text().trim());
        $("#PrecioCompra").val($(this).find("td").eq(4).text().trim());
        $("#CantidadEnStock").val($(this).find("td").eq(5).text().trim());
        $("#IdCategoria").val($(this).find("td").eq(6).text().trim());
    });
    $("#btnGuardar").on("click", function () {
    var nombre = $("#Nombre").val();
    var descripcion = $("#Descripcion").val();
    var precioventa = $("#PrecioVenta").val();
    var preciocompra = $("#PrecioCompra").val();
    var cantidadenstock = $("#CantidadEnStock").val();
    var idcategoria = $("#IdCategoria").val();
    console.log("datos",nombre,descripcion,precioventa,preciocompra,cantidadenstock,idcategoria);
    if (validarNombre(nombre)) {
        $.post("/productos/guardar", {
        Nombre:nombre,
        Descripcion:descripcion,
        PrecioVenta: precioventa,
        PrecioCompra: preciocompra,
        CantidadEnStock: cantidadenstock,
        IdCategoria: idcategoria
        }, function (data) {
        console.log(data);
        var d = JSON.parse(JSON.stringify(data));
        if(d.tipo==="GuardarCorrectamente"){
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
        var precioventa = $("#PrecioVenta").val();
        var preciocompra = $("#PrecioCompra").val();
        var cantidadenstock = $("#CantidadEnStock").val();
        var idcategoria = $("#IdCategoria").val();
        console.log("datos a", id, nombre, descripcion,precioventa,preciocompra,cantidadenstock,idcategoria);
        if (validarNombre(nombre)) {
            $.post("/productos/actualizar", {
                Id: id,
                Nombre: nombre,
                Descripcion: descripcion,
                PrecioVenta: precioventa,
                PrecioCompra: preciocompra,
                CantidadEnStock: cantidadenstock,
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
            });
        } else {
            alert("Debe llenar los campos");
        }
    });
    $("#btnEliminar").on("click", function () {
        var id = $("#Id").val();
        console.log("datos a", id);
        $.post("/productos/eliminar", {
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
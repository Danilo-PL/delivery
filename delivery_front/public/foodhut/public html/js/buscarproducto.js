$(document).ready(function () {
    $('#searchForm').on('submit', function (e) {
        e.preventDefault(); // Previene el comportamiento predeterminado del formulario

        var nombre = $('#buscar').val(); // Obtiene el valor del campo de búsqueda
        if (nombre) {
            // Redirige a la página de categorías con el parámetro de búsqueda
            //window.location.href = 'categorias.php?nombre=' + encodeURIComponent(nombre);
        }
    });
});

import swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const MySwal = whitReactContent(swal);
const swalwithBootstrapButtons = MySwal.mixin({
    custonclass:{
        confirmButton: 'btn btn-succes',
        cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
});

export function mostrarAlerta(mensaje, icono, foco){

    MySwal.fire({
        
        title: mensaje,
        icon: icono, //success, info, error, warning
        confirButtonText: "Aceptar",
        custonclass:{
            confirmButton : 'btn-primary', //clases de boton de confirmacion
        }
    });
}

export function mostraAlertaOk(mensaje, icono, foco){
    MySwal.fire({

        title: mensaje,
        icon: 'success',
        confirmButtonText: "Aceptar",
        showConfirmButton: false,
        timer:1500
    });
}
export function mostraAlertaPregunta(accion,mensaje, icono, foco){
    MySwal.fire({

        title: mensaje,
        icon: 'question',
        confirmButtonText: "Factura",
        showConfirmButton: true,
        cancelButton: 'Recibo',
        showCancelButton: true,
    }).then((re)=>{
        if(re.isconfirmed){
            accion(true)
        }else{
            accion(false)
        }
    });
}
export function mostraAlertaError(mensaje, icono, foco){
    MySwal.fire({

        title: mensaje,
        icon: 'serror',
        confirmButtonText: "Aceptar",
        showConfirmButton: false,
        timer:3000
    });
}
export function mostraAlertaWarning(mensaje, icono, foco){
    MySwal.fire({

        title: mensaje,
        icon: 'warning',
        confirmButtonText: "Aceptar",
        showConfirmButton: false,
        timer:3000
    });
}

export function mostraAlertaModificar(titulo,mensaje, peticion){
    MySwal.fire({

        title: titulo,
        text: mensaje,
        icon: 'warning',
        showCancelButton: true,
        confirmButton: 'Modificar',
        cancelButton: 'Calcel',
        reverseButtons: true
    }).then((result)=>{
        if(result.isconfirmed){
            swalwithBootstrapButtons.fire(
                'Modificado',
                'Registro Modificado',
                'success'
            )
        }else if(result.dismiss === swal.DismissReason.cancel){
            swalwithBootstrapButtons.fire(
                'Cavcelled',
                'Your imaginary file is safe :)',
                'error'
            )
        }
    });
}

function onfocus(foco){
    if (foco !== ''){
        document.getElementById(foco).focus();
    }
}
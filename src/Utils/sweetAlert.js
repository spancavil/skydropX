import Swal from 'sweetalert2';

export default function SwalAlert (error = null) {
    Swal.fire({
        html: '<b>Hubo un problema de conexión</b><br/><br/>' +
        '¡Lo sentimos! Si lo necesitas, puedes contactarte con nuestro <strong>chat de ayuda.</strong>',
        icon: 'error',
        showConfirmButton: true,
        confirmButtonText: "Cerrar",
        width: '470px',
    })
}